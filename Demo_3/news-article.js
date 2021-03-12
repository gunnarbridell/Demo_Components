class NewsArticle extends HTMLElement {
  constructor() {
    super();

    this._article;
  }

  setArticle(article) {
    //console.log("setArticle");
    this._article = article;
  }

  //run once, when init
  connectedCallback() {
    this.innerHTML = `<style>
            p {
                color:black;
                font-family: verdana ;
                font-size: 8px;
            }
            h2 {
                font-family: 'Verdana', 'Times New Roman', Times, serif ;
                font-size: 9px;
            }
        
            a, a:visited {
                text-decoration:none;
                color:green ;
            }
            img {
                width:50%;
            }
            
            .art {
                background-color:rgb(240, 240, 240);
                padding:5px;
                margin-bottom:10px;
                width:400px;
            }
            </style>

            <div class="art">
            <a href= "${this._article.url}">
                <h2> ${this._article.title}</h2>
                <img src="${this._article.urlToImage}">
                <p>${this._article.description}</p>
            </a>
            </div>
        `;
  }
}

customElements.define("news-article", NewsArticle);
