use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct SudokuGrid([[Option<u32>; 9]; 9]);

impl SudokuGrid {
    fn new(grid: [[Option<u32>; 9]; 9]) -> Self {
        SudokuGrid(grid)
    }
}

fn solve_sudoku(grid: &mut [[Option<u32>; 9]; 9]) -> bool {
    for row in 0..9 {
        for col in 0..9 {
            if grid[row][col].is_none() {
                for num in 1..=9 {
                    if is_valid_move(grid, row, col, num) {
                        grid[row][col] = Some(num);
                        if solve_sudoku(grid) {
                            return true;
                        }
                        grid[row][col] = None;
                    }
                }
                return false;
            }
        }
    }
    true
}

fn is_valid_move(grid: &[[Option<u32>; 9]; 9], row: usize, col: usize, num: u32) -> bool {
    for i in 0..9 {
        if grid[row][i] == Some(num) || grid[i][col] == Some(num) {
            return false;
        }
    }
    let start_row = (row / 3) * 3;
    let start_col = (col / 3) * 3;
    for i in 0..3 {
        for j in 0..3 {
            if grid[start_row + i][start_col + j] == Some(num) {
                return false;
            }
        }
    }
    true
}

async fn solve_sudoku_api(grid: web::Json<SudokuGrid>) -> impl Responder {
    let mut grid = grid.into_inner().0;
    if solve_sudoku(&mut grid) {
        HttpResponse::Ok().json(SudokuGrid(grid))
    } else {
        HttpResponse::BadRequest().finish()
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(web::resource("/solve").to(solve_sudoku_api))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
