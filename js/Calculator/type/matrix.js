function Matrix(arr) {
    this.arr = arr || [];
    this.size = (arr && arr.length) ? arr.length : 0;
};