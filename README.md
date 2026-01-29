# 🏨 Zain Luxury Hotel – Full DevOps & Cloud Project

A **production-ready full-stack hotel management system** built with modern DevOps practices:
CI/CD, Docker, Kubernetes, Helm, Jenkins, GitOps (Argo CD), and AWS EKS.

---

## 🚀 Project Overview

Zain Luxury Hotel is a full-stack application that demonstrates how a real company project is designed, deployed, and managed using **modern DevOps and Cloud-native technologies**.

The project focuses on:
- Clean architecture
- Scalable infrastructure
- Secure deployments
- GitOps-based continuous delivery

---

## 🧱 Architecture

Frontend (React + Nginx)
        |
        |  (Ingress / ALB)
        ↓
Backend (Node.js / Express API)
        |
        ↓
Database (PostgreSQL)

CI/CD & Deployment Flow

GitHub
  ↓
Jenkins (CI)
  - Tests
  - Build Docker Images
  - Trivy Scan
  - Push to DockerHub
  ↓
GitOps (Argo CD)
  - Watches Helm configs
  - Syncs with EKS
  ↓
AWS EKS Cluster

---

## 🛠️ Tech Stack

### Application
- Frontend: React + TypeScript + Nginx
- Backend: Node.js + Express
- Database: PostgreSQL
- Authentication: JWT + bcryptjs

### DevOps & Cloud
- Docker & Docker Compose
- Jenkins (CI)
- Helm
- Kubernetes (AWS EKS)
- Ingress (AWS ALB)
- Trivy
- SonarQube
- GitOps with Argo CD
- Terraform (EKS Infrastructure)

---

## 📁 Repository Structure

zain-hotel/
├── src/
│   ├── backend/
│   ├── frontend/
│   └── docker-compose.yml
├── helm/
│   ├── backend/
│   ├── frontend/
│   └── ingress/
├── Jenkinsfile
└── README.md

---

## 🔄 CI/CD Strategy

Jenkins:
- Build & Test
- Security Scan
- Push Docker Images

Argo CD:
- Watches Git
- Syncs Kubernetes state automatically
- Enables Git-based rollback & self-healing

---

## 🧪 Local Development

cd src
docker compose up --build

Frontend: http://localhost:3000
Backend: http://localhost:8000/health

---

## 👨‍💻 Author

Zain – DevOps Engineer

This project reflects real enterprise DevOps workflows.
