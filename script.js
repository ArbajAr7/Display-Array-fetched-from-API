// https://dummyjson.com/posts
// https://dummyjson.com/products
// https://dummyjson.com/todos

document.getElementById("btn").addEventListener("click", () =>{
    document.getElementById("output").innerHTML =`<p id="loading">Loading....</p>`;
    fetchDataWithSequence();
});
function fetchDataWithSequence() {
    fetchApi("https://dummyjson.com/posts",1000)
    .then(data => {
        displayPostsDataOnTable(data.posts);
        return fetchApi("https://dummyjson.com/products",2000);
    }).then(data => {
        displayProductsDataOnTable(data.products);
        return fetchApi("https://dummyjson.com/todos",3000);
    }).then(data => {
        displayTodosDataOnTable(data.todos);
    }).catch(error =>{
        console.log('Error fetching data:', error);
    })
}

function fetchApi(url,delay) {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error =>{
                console.log(url+": "+error);
                reject(error);
            });
        },delay)
    })
}

function displayPostsDataOnTable(data){
    const keys = Object.keys(data[0]);
    document.getElementById("output").innerHTML =`
    <h2>Posts</h2>
    <table>
    <thead>
    <tr id="thead_tr1">
    </tr>
    </thead>
    <tbody id="tbody1">
    </tbody>
    </table>`;
    
    keys.forEach(item => {
        document.getElementById("thead_tr1").innerHTML += `
        <th>${item}</th>`;
    })
    data.forEach(item => {
        let likes = item.reactions.likes;
        let dislikes = item.reactions.dislikes;
        document.getElementById("tbody1").innerHTML += `
        <tr>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.body}</td>
        <td>${item.tags}</td>
        <td>Likes: ${likes}, Dislikes: ${dislikes}</td>
        <td>${item.views}</td>
        <td>${item.userId}</td>


        </tr>`;
    })
    
}

function displayProductsDataOnTable(data){
    const keys = Object.keys(data[0]);
    document.getElementById("output").innerHTML +=`
    <h2>Products</h2>
    <table>
    <thead>
    <tr id="thead_tr2">
    </tr>
    </thead>
    <tbody id="tbody2">
    </tbody>
    </table>`;
    
    keys.forEach(item => {
        document.getElementById("thead_tr2").innerHTML += `
        <th>${item}</th>`;
    })
    data.forEach((item,index) => {
        let width = item.dimensions.width;
        let height = item.dimensions.height;
        let depth = item.dimensions.depth;
        let createdAt = item.meta.createdAt;
        let updatedAt = item.meta.updatedAt;
        let barcode = item.meta.barcode;
        let qrCode = item.meta.qrCode;
        // let rating1 = item.reviews[0].rating;
        // let rating2 = item.reviews[1].rating;
        // let rating3 = item.reviews[2].rating;
        // let comment1 = item.reviews[0].comment;
        // let comment2 = item.reviews[1].comment;
        // let comment3 = item.reviews[2].comment;
        // let date1 = item.reviews[0].date;
        // let date2 = item.reviews[1].date;
        // let date3 = item.reviews[2].date;
        document.getElementById("tbody2").innerHTML += `
        <tr>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.description}</td>
        <td>${item.category}</td>
        <td>${item.price}</td>
        <td>${item.discountPercentage}</td>
        <td>${item.rating}</td>
        <td>${item.stock}</td>
        <td>${item.tags}</td>
        <td>${item.brand}</td>
        <td>${item.sku}</td>
        <td>${item.weight}</td>
        <td>Width: ${width}, height: ${height}, Depth: ${depth}</td>
        <td>${item.warrantyInformation}</td>
        <td>${item.shippingInformation}</td>
        <td>${item.availabilityStatus}</td>
        <td id="product_reviews${index}"></td>
        <td>${item.returnPolicy}</td>
        <td>${item.minimumOrderQuantity}</td>
        <td>Created At: ${createdAt}, Updated At: ${updatedAt}, BarCode: ${barcode}<img height="100" width="100" src="${qrCode}"></td>
        <td id="product_images${index}"></td>
        <td><img height="200" width="200" src="${item.thumbnail}"></td>
        </tr>`;
        let reviews = item.reviews;
        reviews.forEach(details => {
            console.log(index);
            document.getElementById("product_reviews"+index).innerHTML += `
            <div id="review_div">
            <p>Rating: ${details.rating}</p>
            <p>Comment: ${details.comment}</p>
            <p>Reviewer Nmae: ${details.reviewerName}</p>
            <p>Reviewer Email: ${details.reviewerEmail}</p>
            </div>`
        });
        let images = item.images;
        images.forEach(imageurl => {
            document.getElementById("product_images"+index).innerHTML += `
            <img id="item_image" src="${imageurl}" style="width:130px"><hr>`
        })
    })
    
    
}
function displayTodosDataOnTable(data) {
    const keys = Object.keys(data[0]);
    document.getElementById("output").innerHTML +=`
    <h2>Todos</h2>
    <table>
    <thead>
    <tr id="thead_tr3">
    </tr>
    </thead>
    <tbody id="tbody3">
    </tbody>
    </table>`;
    
    keys.forEach(item => {
        document.getElementById("thead_tr3").innerHTML += `
        <th>${item}</th>`;
    });
    data.forEach((item,index) => {
        document.getElementById("tbody3").innerHTML += `
        <tr>
        <td>${item.id}</td>
        <td>${item.todo}</td>
        <td>${item.completed}</td>
        <td>${item.userId}</td>
        </tr>` 
    })
}