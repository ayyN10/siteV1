<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Attribute\Route;
use Twig\Environment;

class HomeController extends AbstractController
{
    #[Route('/')]
    public function index(): Response
    {
        return $this->render('base.html.twig', [
            'user_name' => 'hugo',
        ]);
    }

    #[Route('/xmb', name: 'xmb')]
    public function xmb(): Response
    {
        return $this->render('xmb/index.html');
    }

    #[Route('/contact/send', name: 'contact_send', methods: ['POST'])]
    public function send(Request $request, MailerInterface $mailer, Environment $twig): JsonResponse
    {
        $data = $request->request->all();

        try {
            $htmlContent = $twig->render('email/contact.html.twig', [
                'email' => $data['email'],
                'message' => $data['message'],
            ]);

            $email = (new Email())
                ->from('no-reply@hugo.com')
                ->to('higozoum@gmail.com')
                ->replyTo($data['email'])
                ->subject($data['subject'])
                ->html($htmlContent);

            $mailer->send($email);

            return new JsonResponse(['success' => true]);
        } catch (Exception $exception) {
            return new JsonResponse(['success' => false]);
        }
    }
}
