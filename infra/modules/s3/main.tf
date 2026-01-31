resource "aws_s3_bucket" "puddle_app_bucket" {
  bucket = var.s3_bucket_name
  tags = {
    Name        = "puddle-app-bucket"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_ownership_controls" "puddle_app_bucket_ownership_controls" {
  bucket = aws_s3_bucket.puddle_app_bucket.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "puddle_app_bucket_public_access_block" {
  bucket = aws_s3_bucket.puddle_app_bucket.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "public_read_static_and_products" {
  bucket = aws_s3_bucket.puddle_app_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource = [
          "arn:aws:s3:::${aws_s3_bucket.puddle_app_bucket.bucket}/staticfiles/*",
          "arn:aws:s3:::${aws_s3_bucket.puddle_app_bucket.bucket}/media/*"
        ]
      }
    ]
  })
}

resource "aws_s3_bucket_versioning" "puddle_app_bucket_versioning" {
  bucket = aws_s3_bucket.puddle_app_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "puddle_app_bucket_sse" {
  bucket = aws_s3_bucket.puddle_app_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}