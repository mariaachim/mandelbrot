height = 50;
width = 100;
num_iterations = 100
alphabet = "@#**+++====-----::::...... "

def check_if_mandelbrot(x, y):
    c = complex(x, y) # constant
    z = complex(0, 0)
    for i in range(num_iterations):
        z = z*z + c
        if abs(z) >= 2:
            return i
    if abs(z) < 2:
        return -1
    else:
        return num_iterations

for y in range(height):
    row = ""
    for x in range(width):
        x_mandelbrot_coord = 0.04 * x - 2
        y_mandelbrot_coord = 0.04 * (height - y) - 1
        value = check_if_mandelbrot(x_mandelbrot_coord, y_mandelbrot_coord) * len(alphabet)
        if value < 0:
            row += "@"
        else:
            index = len(alphabet) - (value // num_iterations)
            row += alphabet[index - 1]
    print(row)
        

