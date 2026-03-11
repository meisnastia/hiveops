terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  # Remote state — uncomment when GCS bucket is created
  # backend "gcs" {
  #   bucket = "hiveops-tfstate"
  #   prefix = "terraform/state"
  # }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# ─── Variables ──────────────────────────────────────

variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "europe-west1"
}

variable "custom_domain" {
  description = "Custom domain for the site"
  type        = string
  default     = "smartbee.me"
}

# ─── Enable APIs ────────────────────────────────────

resource "google_project_service" "firebase" {
  service            = "firebase.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "firebasehosting" {
  service            = "firebasehosting.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudbuild" {
  service            = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

# ─── Firebase Project ───────────────────────────────

resource "google_firebase_project" "default" {
  provider = google
  project  = var.project_id

  depends_on = [google_project_service.firebase]
}

# ─── Firebase Hosting Site ──────────────────────────

resource "google_firebase_hosting_site" "default" {
  provider = google
  project  = var.project_id
  site_id  = var.project_id

  depends_on = [
    google_firebase_project.default,
    google_project_service.firebasehosting,
  ]
}

# ─── Service Account for CI/CD ──────────────────────

resource "google_service_account" "github_actions" {
  account_id   = "github-actions-deploy"
  display_name = "GitHub Actions Deploy"
  description  = "Service account for GitHub Actions CI/CD pipeline"
}

resource "google_project_iam_member" "firebase_admin" {
  project = var.project_id
  role    = "roles/firebase.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_project_iam_member" "hosting_admin" {
  project = var.project_id
  role    = "roles/firebasehosting.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# ─── Outputs ────────────────────────────────────────

output "hosting_site_url" {
  value       = "https://${var.project_id}.web.app"
  description = "Firebase Hosting default URL"
}

output "service_account_email" {
  value       = google_service_account.github_actions.email
  description = "Service account for GitHub Actions"
}
