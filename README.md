# photo-album-api
RESTful API with Express.js to manage albums and photos, including Postman documentation.

This project provides a RESTful API built with Express.js to manage photo albums. Each album can contain multiple photos, and the API allows CRUD operations on both.

## Features
- Get all photos of an album
- Get a specific photo by ID
- Add a photo to an album
- Update an existing photo
- Delete a photo from an album

## Endpoints

### Get all photos in an album
`GET /album/:albumId/photo`

### Get a specific photo
`GET /album/:albumId/photo/:photoId`

### Add a photo
`POST /album/:albumId/photo`

### Update a photo
`PUT /album/:albumId/photo/:photoId`

### Delete a photo
`DELETE /album/:albumId/photo/:photoId`

## File Structure
- `Api.js` – Express routes for handling photo and album interactions
- `Api-Postman` – Postman collection to test the API endpoints (import in Postman)
- `models/photo.js` and `models/album.js` – (not provided here but expected to define Mongoose schemas)

## Requirements
- Node.js
- MongoDB
- Express
- Mongoose

## Getting Started
1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
