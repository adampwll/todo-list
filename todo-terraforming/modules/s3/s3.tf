resource "aws_s3_bucket" "todo_list_frontend_bucket" {
  bucket = "${var.project}-frontend-${var.environment}"
  
  tags = {
    Name = "${var.name} Frontend ${var.environment}"
    project = var.project
    environment = var.environment
  }
}

resource "aws_s3_bucket_website_configuration" "todo_list_website_configuration" {
  bucket = aws_s3_bucket.todo_list_frontend_bucket.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_public_access_block" "todo_list_public_access_block" {
  bucket = aws_s3_bucket.todo_list_frontend_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket  = aws_s3_bucket.todo_list_frontend_bucket.id
  acl     = "public-read"
  depends_on = [aws_s3_bucket_ownership_controls.s3_bucket_acl_ownership]
}

resource "aws_s3_bucket_versioning" "s3_versioning" {
  bucket = aws_s3_bucket.todo_list_frontend_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_acl_ownership" {
  bucket = aws_s3_bucket.todo_list_frontend_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
  depends_on = [ aws_s3_bucket_public_access_block.todo_list_public_access_block ]
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.todo_list_frontend_bucket.id
  policy = data.aws_iam_policy_document.bucket_iam_document.json
}
data "aws_iam_policy_document" "bucket_iam_document" {
  statement {
    sid = "AllowPublicRead"
    effect = "Allow"
    resources = [
      "arn:aws:s3:::${var.project}-frontend-${var.environment}",
      "arn:aws:s3:::${var.project}-frontend-${var.environment}/*"
    ]
    actions = ["S3:GetObject"]
    principals {
      type = "*"
      identifiers = ["*"]
    }
  }
  depends_on = [ aws_s3_bucket_public_access_block.todo_list_public_access_block ]
}