Enter in terminal "node app.js" then you started this app. Also you can pass:
1)-c or --config: config for ciphers, config is a string with pattern {XY(-)}n, where:
X is a cipher mark:
C is for Caesar cipher (with shift 1)
A is for Atbash cipher
R is for ROT-8 cipher
Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
1 is for encoding
0 is for decoding
2) -i or --input: a path to input file
   -o or --output: a path to output file
   For example, config "C1-C1-R0-A" means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"
   For example, config node app.js -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
   