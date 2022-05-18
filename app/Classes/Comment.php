<?php

class Comment
{
    private int $id;
    private int $authorId;
    private string $date;
    private string $content;
    private int $movieId;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Comment
     */
    public function setId(int $id): Comment
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return int
     */
    public function getAuthorId(): int
    {
        return $this->authorId;
    }

    /**
     * @param int $authorId
     * @return Comment
     */
    public function setAuthorId(int $authorId): Comment
    {
        $this->authorId = $authorId;
        return $this;
    }

       /**
     * @return int
     */
    public function getmovieId(): int
    {
        return $this->movieId;
    }

    /**
     * @param int $movieId
     * @return Comment
     */
    public function setmovieId(int $movieId): Comment
    {
        $this->movieId = $movieId;
        return $this;
    }

    /**
     * @return string
     */
    public function getDate(): string
    {
        return $this->date;
    }

    /**
     * @param string $date
     * @return Comment
     */
    public function setDate(string $date): Comment
    {
        $this->date = $date;
        return $this;
    }

    /**
     * @return string
     */
    public function getContent(): string
    {
        return $this->content;
    }

    /**
     * @param string $content
     * @return Comment
     */
    public function setContent(string $content): Comment
    {
        $this->content = $content;
        return $this;
    }


}
