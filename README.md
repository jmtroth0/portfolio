# Portfolio

Photography portfolio at <https://portfolio.jordanroth.xyz>, built with [Gatsby](https://www.gatsbyjs.com/) 4 and TypeScript.

## How it works

- **Photos are not in this repo.** At build time `@marceasen/gatsby-source-s3-image` lists every image in the S3 bucket `jmtr-portfolio-photos` (us-west-2), downloads them, and `gatsby-plugin-sharp` generates responsive versions.
- **Order:** photos are sorted newest first by EXIF capture date (see the query in `src/pages/index.tsx`).
- **Hosting:** the built site is uploaded to the S3 bucket `jmtr-portfolio-page` by `gatsby-plugin-s3`, and served through CloudFront (distribution `E6XNXE0AVQK1B`).

## Adding or removing photos

1. Add or delete objects in the `jmtr-portfolio-photos` bucket.
2. Name files with a **lowercase** extension: `.jpg`, `.jpeg`, `.png`, `.gif` or `.webp`. The source plugin checks extensions case-sensitively and silently skips anything else (`.JPG`, `.HEIC`, `.tiff`, ...). Convert HEIC to JPG before uploading.
3. Redeploy (see below). The site only changes when it is rebuilt.

The plugin lists the bucket once with no pagination, so it sees at most 1,000 objects.

## Development

```shell
npm install
npm run develop     # http://localhost:8000
npm run typecheck   # needs a prior develop/build, which generates the GraphQL query types
```

The build downloads photos from S3, so it needs AWS credentials that can read `jmtr-portfolio-photos`. Either put `S3_API_KEY_ID` and `S3_API_KEY` in a `.env.development` / `.env.production` file (gitignored), or use any other method in the AWS default credential chain, such as `AWS_PROFILE` or exported `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_SESSION_TOKEN`.

## Deploying

### Automatic (GitHub Actions)

Every push to `main` runs `.github/workflows/deploy.yml`: build, typecheck, upload to S3, then invalidate CloudFront. You can also run it by hand from the Actions tab ("Run workflow"), which is how you republish after changing photos.

The workflow authenticates to AWS with OIDC, so no access keys are stored in GitHub. One-time setup:

1. **Create the GitHub OIDC provider** in IAM (skip if it exists): provider URL `https://token.actions.githubusercontent.com`, audience `sts.amazonaws.com`.
2. **Create an IAM role** for the workflow with this trust policy (replace `ACCOUNT_ID`):

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Principal": { "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com" },
       "Action": "sts:AssumeRoleWithWebIdentity",
       "Condition": {
         "StringEquals": {
           "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
           "token.actions.githubusercontent.com:sub": "repo:jmtroth0/portfolio:ref:refs/heads/main"
         }
       }
     }]
   }
   ```

3. **Attach a permissions policy** (replace `ACCOUNT_ID`):

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["s3:ListBucket", "s3:GetObject"],
         "Resource": ["arn:aws:s3:::jmtr-portfolio-photos", "arn:aws:s3:::jmtr-portfolio-photos/*"]
       },
       {
         "Effect": "Allow",
         "Action": [
           "s3:ListBucket", "s3:GetBucketLocation", "s3:GetBucketWebsite", "s3:PutBucketWebsite",
           "s3:GetObject", "s3:PutObject", "s3:PutObjectAcl", "s3:DeleteObject"
         ],
         "Resource": ["arn:aws:s3:::jmtr-portfolio-page", "arn:aws:s3:::jmtr-portfolio-page/*"]
       },
       {
         "Effect": "Allow",
         "Action": "cloudfront:CreateInvalidation",
         "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/E6XNXE0AVQK1B"
       }
     ]
   }
   ```

   If a deploy fails with `AccessDenied`, the error names the missing action; add it here.
4. **Add the role ARN to GitHub:** repo Settings, Secrets and variables, Actions, new repository secret `AWS_ROLE_ARN`.

### Manual

```shell
npm run bdeploy     # gatsby build, upload to S3, invalidate CloudFront
```

`npm run deploy` uploads an existing `public/` folder without rebuilding, and `npm run invalidate` only clears the CloudFront cache. Manual deploys need AWS credentials with the same permissions as the role above (for example SSO, via `aws configure export-credentials --format env`) and the AWS CLI installed.

## Project layout

```
src/pages/index.tsx            the page: GraphQL query, <head> metadata, photo grid
src/pages/404.tsx              not-found page
src/components/image-list*.tsx the grid and its items
src/scss/image-list.scss       styles
gatsby-config.ts               plugins: S3 photo source, sharp, S3 deploy, gtag
```
