import { defineStore } from "pinia";
import axios from "axios";
import UIkit from "uikit";

export const useProductStore = defineStore("product", {
  state: () => ({
    productName: [],
    singleProduct:[],
    productError: [],
    errResp: [],
    showGallery: false,
    productReady: false,
    productAvailable: [],
    productResponse:[],
    imageCache: new Map()
  }),
  getters: {
    item: (state) => state.productName,
    product: (state) => state.singleProduct,
    p_response: (state) => state.productResponse,
    error: (state) => state.productError,
    errorResponse: (state) => state.errResp,
    gallery: (state) => state.showGallery,
    ready: (state) => state.productReady,
    available: (state) => state.productAvailable,
  },
  actions: {
    clearErrors() {
      this.productError = [];
    },

    loadPage(data) {
      this.productReady = data;
    },

    handleShow() {
      this.showGallery = !this.showGallery;
    },

    saveImage(image, image2, image3, image4) {
      this.productName.image = image;
      this.productName.image2 = image2;
      this.productName.image3 = image3;
      this.productName.image4 = image4;
      UIkit.modal("#modal-show-gallery").hide();
    },

    async getProducts(page) {
      this.errResp = [];
      this.productReady = false;
      this.productError = [];

      try {
        const response = await axios.get(`api/products?page=${page}`)
        // console.log(response);
        // this.productName = response.data.data;
        this.productResponse = response.data
        const productsWithImages = await Promise.all(
          response.data.data.map(async (p) => {
            if (p.image) {
              p.imageUrl = await this.getImageUrl(p.image); // Ensure awaiting the image URL
            }
            return p; // Return the product with the imageUrl added
          })
        );

        // Set the productName array once all images are fetched
        this.productName = productsWithImages;
        console.log(this.productName);
        
        
        
      } catch (error) {
        console.log(error.message)          
      }
    },

    async getProduct(id) {
      this.errResp = [];
      try {
        const response = await axios.get("api/products/" + id);
        this.singleProduct = response.data.data;
        let test = response.data.data.name
        // console.log(he.encode(test));
        
      } catch (error) {
        console.log(error.message);        
        this.errResp = error.response.status;
      }
    },

    async createProduct(data) {
      this.errResp = [];
      this.productError = [];
      try {
        const res = await axios.post("api/products", data, {
          headers:{
            'Content-Type' : 'multipart/form-data'
          }
        });
        this.router.push("/dashboard/products");
        console.log(res);
        
      } catch (error) {
        if (error.response.status === 422) {
          this.productError = error.response.data.errors;
        } else {
          this.errResp = error;
        }
      }
    },

    async updateProduct(id,file) {      
        
      const formdata = new FormData()
      const blob = new Blob([file], { type: file.type })
      
      if(typeof file.name !== 'undefined'){        
        formdata.append('image', blob, file.name)           
      }            
      formdata.append('name', this.singleProduct.name)
      formdata.append('code', this.singleProduct.code)
      formdata.append('id_category', this.singleProduct.id_category)
      formdata.append('price', this.singleProduct.price)
      formdata.append('stock', this.singleProduct.stock)
      formdata.append('weight', this.singleProduct.weight)
      formdata.append('description', this.singleProduct.weight)
      formdata.append('_method','PUT')
      
      this.errResp = [];
      try {
        const res = await axios.post("api/products/" + id , formdata, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to FormData
            
          },
        });
        this.router.back()
      //   // console.log(res);        
      } catch (error) {
        console.log(error);
        if (error.response.status === 422) {
          this.productError = error.response.data.errors;
        }
      }
    },

    setProductReady() {
      const filtered = this.productName.filter(
        (item) => item.isDisplayed === true
      );

      this.productAvailable = filtered;
    },

    async handleToggleReady(index) {
      //toggle buat liat textbox/textarea untuk 'tulis catatan'
      this.productName[index].isDisplayed =
        !this.productName[index].isDisplayed;
      try {
        const response = await axios.put("api/products/" + this.productName[index].id, this.productName[index]);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    // async updateDisplayed(id) {
    //   try {
    //     await axios.put('api/products/update-displayed/' + id);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    async destroyProduct(id) {
      try {
        await axios.delete("api/products/" + id);
        await this.getProducts();
        this.productReady = true;
      } catch (error) {
        console.log(error);
      }
    },

    async searchProduct(name) {
      try {
        const response = await axios.get(`api/search?name=${name}`);
        this.productName = response.data;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },

    clearSearchResults() {
      this.productName = [];
    },

    async fetchImage(imagePath) {
      // if (this.imageCache.has(imagePath)) {
      //   return this.imageCache.get(imagePath);
      // }

      const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/storage/${imagePath}`;
      try {        
        const response = await axios.get('/storage/' + imagePath, 
          // {
          // responseType: 'blob',
          // headers: {
          //   'ngrok-skip-browser-warning': '1',            
          // },
          // }
        );
        const blobUrl = URL.createObjectURL(response.data);
        this.imageCache.set(imagePath, blobUrl);
        console.log(blobUrl);
        
        return blobUrl;
      } catch (error) {
        console.error('Failed to fetch image:', error);
        return ''; 
      }
    },

    async getImageUrl(imagePath){
      const fullUrl = await fetch(`/.netlify/functions/proxy?image=${imagePath}`)
      const data = await fullUrl.blob()      

      return URL.createObjectURL(data)
    },
  },
  persist: true,
});
