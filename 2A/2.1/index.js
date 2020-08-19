


function bai1(){
    let a=prompt("Nhập vào một mảng số nguyên cách nhau bởi dấu phẩy:")
    a=a.split(",")
    let f=function(array){
        return array.filter(num=>num%2===0)
    }
    console.log("Phần tử cuối cùng chia hết cho hai là: "+f(a)[f(a).length-1])
    return f(a)[f(a).length-1]
}

bai1()