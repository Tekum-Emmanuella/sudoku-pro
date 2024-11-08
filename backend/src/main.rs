use actix_web::{get, App, HttpServer, Responder};

#[get("/api/hello")]
async fn hello() -> impl Responder {
    "Hello from Rust backend!"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
