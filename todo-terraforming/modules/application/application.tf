resource "aws_servicecatalogappregistry_application" "todo_list_application" {
  name          = "TodoList$-${var.environment}"
  description   = "To-do List web application ${var.environment}"
  tags          = {
    project     = var.project
    environment = var.environment
  }
}