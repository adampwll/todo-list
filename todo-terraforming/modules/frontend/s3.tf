resource "aws_s3_bucket" "todo_list_frontend_bucket" {
  bucket = "todo-list-frontend"

  tags = {
    Name = "Todo List Frontend"
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