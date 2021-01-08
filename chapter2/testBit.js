var myBuffer = [96,32,0,0,0,0,1]

myBuffer.forEach(function(byte,byteIndex) {
for (var bitIndex = 7; bitIndex >=0 ; bitIndex--) {
 var visited = byte >> bitIndex&1;
    if (visited === 1){
 var userId = byteIndex * 8 + (7 - bitIndex);
console.log(userId);
console.log('visited');
}
else{
var userId = byteIndex * 8 + (7 -bitIndex);
console.log(userId);
console.log('nonVisited');
}
}
});

