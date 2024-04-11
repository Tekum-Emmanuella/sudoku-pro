pub struct GameState {
    grid: [[u8; 9]; 9], // 9x9 grid to store Sudoku numbers (0 for empty)
}

impl GameState {
    pub fn new() -> Self {
        GameState { grid: [[0; 9]; 9] }
    }

    pub fn set_cell(&mut self, row: usize, col: usize, value: u8) {
        self.grid[row][col] = value;
    }

    pub fn get_cell(&self, row: usize, col: usize) -> u8 {
        self.grid[row][col]
    }

    pub fn is_valid(&self, row: usize, col: usize, value: u8) -> bool {
        // Check for conflicts in row and column
        for i in 0..9 {
            if self.grid[row][i] == value || self.grid[i][col] == value {
                return false;
            }
        }

        // Check for conflicts in 3x3 subgrid
        let subgrid_row_start = (row / 3) * 3;
        let subgrid_col_start = (col / 3) * 3;
        for i in 0..3 {
            for j in 0..3 {
                let subgrid_row = subgrid_row_start + i;
                let subgrid_col = subgrid_col_start + j;
                if self.grid[subgrid_row][subgrid_col] == value {
                    return false;
                }
            }
        }

        true
    }

    pub fn is_solved(&self) -> bool {
        for row in 0..9 {
            for col in 0..9 {
                if self.grid[row][col] == 0 {
                    return false;
                }
            }
        }
        true
    }
}
