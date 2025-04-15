const express = require('express');
const Photo = require('../models/photo');
const Album = require('../models/album');
const router = express.Router();

// GET /albums/:albumId/photos : Récupérer toutes les photos d'un album
router.get('/album/:albumId/photo', async (req, res) => {
    try {
        const photos = await Photo.find({ album: req.params.albumId });
        res.status(200).send(photos);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET /albums/:albumId/photos/:photoId : Récupérer une photo spécifique d'un album
router.get('/album/:albumId/photo/:photoId', async (req, res) => {
    try {
        const photo = await Photo.findOne({ _id: req.params.photoId, album: req.params.albumId });
        if (!photo) {
            return res.status(404).send();
        }
        res.status(200).send(photo);
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST /albums/:albumId/photos : Ajouter une nouvelle photo à un album
router.post('/album/:albumId/photo', async (req, res) => {
    try {
        const photo = new Photo({
            ...req.body,
            album: req.params.albumId
        });
        await photo.save();

        const album = await Album.findById(req.params.albumId);
        album.photos.push(photo._id);
        await album.save();

        res.status(201).send(photo);
    } catch (error) {
        res.status(400).send(error);
    }
});

// PUT /albums/:albumId/photos/:photoId : Mettre à jour une photo existante dans un album
router.put('/album/:albumId/photo/:photoId', async (req, res) => {
    try {
        const photo = await Photo.findOneAndUpdate(
            { _id: req.params.photoId, album: req.params.albumId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!photo) {
            return res.status(404).send();
        }
        res.status(200).send(photo);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE /albums/:albumId/photos/:photoId : Supprimer une photo d'un album
router.delete('/album/:albumId/photo/:photoId', async (req, res) => {
    try {
        const photo = await Photo.findOneAndDelete({ _id: req.params.photoId, album: req.params.albumId });
        if (!photo) {
            return res.status(404).send();
        }

        const album = await Album.findById(req.params.albumId);
        album.photos.pull(photo._id);
        await album.save();

        res.status(200).send(photo);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports=router;
