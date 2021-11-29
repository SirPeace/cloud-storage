<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Security\User\JWTUserInterface;

class User implements JWTUserInterface
{
    protected string $id;
    protected string $email;

    public function __construct(array $props)
    {
        $this->id = $props['id'];
        $this->email = $props['email'];
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public static function createFromPayload($username, array $payload): JWTUserInterface
    {
        return new self($payload);
    }

    public function getUserIdentifier()
    {
        return $this->id;
    }

    public function getRoles(): array
    {
        return ["USER_ROLE"];
    }

    public function getPassword(): string
    {
        return "";
    }

    public function getSalt(): string
    {
        return "";
    }

    public function eraseCredentials()
    {
        //
    }

    public function getUsername()
    {
        return $this->getUserIdentifier();
    }
}
