declare interface String {
  red(): string;
  green(): string;
  yellow(): string;
  blue(): string;
  purple(): string;
  teal(): string;
  white(): string;
}

// For Theme One Half Dark
const colorMap = {
  red: "#e06c75", // Rose
  green: "#98c379",
  yellow: "#e5c07b",
  blue: "#61afef",
  purple: "#c678dd", //Lavendar
  teal: "#56b6c2", // Aqua
  white: "#dcdfe4",
};

String.prototype.red = function (this: string) {
  return `<font color="${colorMap.red}">${this}</font>`;
};

String.prototype.green = function (this: string) {
  return `<font color="${colorMap.green}">${this}</font>`;
};

String.prototype.yellow = function (this: string) {
  return `<font color="${colorMap.yellow}">${this}</font>`;
};

String.prototype.blue = function (this: string) {
  return `<font color="${colorMap.blue}">${this}</font>`;
};

String.prototype.purple = function (this: string) {
  return `<font color="${colorMap.purple}">${this}</font>`;
};

String.prototype.teal = function (this: string) {
  return `<font color="${colorMap.teal}">${this}</font>`;
};

String.prototype.white = function (this: string) {
  return `<font color="${colorMap.white}">${this}</font>`;
};
