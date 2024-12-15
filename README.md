# Library Management API

A dockerized RESTful API for managing a collection of books in a library. This API supports:

- **Add new books**  
- **List all books**  
- **Search books** by author, published year, or genre  
- **Update book details** by ISBN  
- **Delete book** by ISBN  
- **Swagger Documentation** accessible at `/api-docs`

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) and npm (only if running locally without Docker)

### Local Development (without Docker)
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/library-management-api.git



# CI/CD Pipeline for Library Management API

## Branch Strategy
- **main**: Stable production-ready code.
- **backend**: Development branch for backend changes.
- **deploy**: Placeholder branch for potential deployment activities.

## GitHub Actions Workflows
- **Pre-Merge Validation**:
  - Trigger: Pull requests targeting `main`.
  - Validates code quality using linting and unit tests.
- **Backend Component Build**:
  - Trigger: Pushes to `backend`.
  - Tests and builds backend components.

## Deployment
Deployment has not been configured as part of this project.

