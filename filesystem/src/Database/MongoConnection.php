<?php

namespace App\Database;

use MongoDB\Client;
use MongoDB\Database;

class MongoConnection
{
    protected Client $client;
    protected static string $dbName = "filesystem";

    public function __construct()
    {
        $this->client = new Client($this->getDsn());
    }

    public function getDatabase(): Database
    {
        return $this->client->{static::$dbName};
    }

    protected function getDsn(): string
    {
        return sprintf(
            "mongodb://%s:%s@%s:%d",
            $_SERVER["MONGO_USERNAME"],
            $_SERVER["MONGO_PASSWORD"],
            $_SERVER["MONGO_IP"],
            $_SERVER["MONGO_PORT"]
        );
    }
}
