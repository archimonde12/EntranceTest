


function bai2(){
    let a=prompt("Nhập vào một mảng A(cách nhau bởi dấu phẩy):")
    a=a.split(",")
    let b=prompt("Nhập vào một mảng B(cách nhau bởi dấu phẩy):")
    b=b.split(",")
    console.log(a)
    console.log(b)
    let result=[];
    // let f=function(array){
    //     return array.filter(num=>num%2===0)
    // }
    // console.log("kết quả cần tìm là: "+f(a)[f(a).length-1])
    // return f(a)[f(a).length-1]
    for(let valueA of a){
       if(b.indexOf(valueA)==-1){
           b.push(valueA)
       } else {
           b.splice(b.indexOf(valueA),1)
       }
    }
    console.log(b)
}

bai2()