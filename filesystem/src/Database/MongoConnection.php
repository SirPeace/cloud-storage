<?php

namespace App\Database;

use MongoDB\Client;
use MongoDB\Database;

class MongoConnection
{
    protected Client $client;
    protected string $dbName;

    public function __construct(string $dbName = "filesystem")
    {
        $this->dbName = $dbName;
        $this->client = new Client($this->getDsn());
    }

    public function getDatabase(): Database
    {
        return $this->client->{$this->dbName};
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
