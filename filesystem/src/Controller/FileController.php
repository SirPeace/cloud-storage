<?php

namespace App\Controller;

use App\Database\MongoConnection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FileController extends AbstractController
{
    /**
     * Get all user's files
     */
    #[Route('/file', methods: ["get"], name: 'file.index')]
    public function index(MongoConnection $mongoConnection): Response
    {
        $db = $mongoConnection->getDatabase();
        $data = $db->files->find()->toArray();

        return $this->json(compact('data'));
    }

    /**
     * Update file
     */
    #[Route('/file', methods: ["put"], name: 'file.update')]
    public function update(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/FileController.php',
        ]);
    }

    /**
     * Copy the existing file
     */
    #[Route('/file', methods: ["post"], name: 'file.copy')]
    public function copy(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/FileController.php',
        ]);
    }

    /**
     * Delete file
     */
    #[Route('/file', methods: ["delete"], name: 'file.destroy')]
    public function destroy(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/FileController.php',
        ]);
    }

    /**
     * Handle new file upload
     */
    #[Route('/file', methods: ["post"], name: 'file.upload')]
    public function upload(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/FileController.php',
        ]);
    }

    /**
     * Return a download link of the stored file
     */
    #[Route('/file', methods: ["get"], name: 'file.download')]
    public function download(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/FileController.php',
        ]);
    }
}
