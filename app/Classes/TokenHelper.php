<?php

class TokenHelper
{
    private static string $appSecret = 'unSuperSecret!';

    /**
     * @throws Exception
     */
    static public function buildToken(): string
    {
        $bytes = random_bytes(50);
        return bin2hex($bytes);
    }

    public static function buildJWT(User $user): string
    {
        return \Firebase\JWT\JWT::encode([
            'exp' => time() + 20,
            'userId' => $user->getId(),
            'username' => $user->getUsername()
        ], self::$appSecret, 'HS256');
    }
}
