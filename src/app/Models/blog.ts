export class Blog {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
  
    constructor(
      author: string,
      title: string,
      description: string,
      url: string,
      urlToImage: string,
      publishedAt: Date,
      content: string
    ) {
      this.author = author;
      this.title = title;
      this.description = description;
      this.url = url;
      this.urlToImage = urlToImage;
      this.publishedAt = publishedAt;
      this.content = content;
    }
  }
  