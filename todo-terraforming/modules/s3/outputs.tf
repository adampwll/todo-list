output "s3_bucket_id" {
  value = aws_s3_bucket_website_configuration.todo_list_website_configuration.website_endpoint
}