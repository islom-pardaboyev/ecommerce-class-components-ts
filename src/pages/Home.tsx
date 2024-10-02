import axios from "axios";
import { Component } from "react";
import { FaStar } from "react-icons/fa6";

export interface ProductsData {
  id: number;
  title: string;
  price: number;
  desc: string;
  category: string;
  image: string;
  rating: RatingData;
}

interface RatingData {
  rate: number;
  count: number;
}

interface HomeState {
  productSlice: any;
  data: null | ProductsData[];
  isLoading: boolean;
}

export class Home extends Component<{}, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      productSlice: 4,
      data: [] as ProductsData[],
      isLoading: true,
    };
  }

  componentDidMount(): void {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      this.setState({ data: res.data });
      this.setState({ isLoading: !this.state.isLoading });
    });
  }

  render() {

    const categoriesColor: { [key: string]: string } = {
      "men's clothing":
        "bg-blue-500 text-white inline-block px-2.5 py-0.5 rounded-full text-xs font-medium",
      "women's clothing":
        "bg-red-500 text-white inline-block px-2.5 py-0.5 rounded-full text-xs font-medium",
      kids: "bg-green-500 text-white inline-block px-2.5 py-0.5 rounded-full text-xs font-medium",
      electronics:
        "bg-yellow-500 text-white inline-block px-2.5 py-0.5 rounded-full text-xs font-medium",
      jewelery:
        "bg-purple-500 text-white inline-block px-2.5 py-0.5 rounded-full text-xs font-medium",
    };

    if (this.state.isLoading) {
      return (
        <section className="flex items-center justify-center h-screen">
          <h1 className="font-medium text-4xl">Loading...</h1>
        </section>
      );
    }
    return (
      <section className="py-10">
        <div className="container mx-auto">
        <div className="my-2 flex items-center justify-between">
        <h1 className="text-3xl font-medium">Products</h1>
        <p className="font-medium text-lg select-none text-neutral-400 hover:underline cursor-pointer" onClick={() => {
          this.setState({ productSlice: this.state.productSlice == 4 ? this.state.data?.length : 4 })
        }}>{this.state.productSlice == 4 ? 'Show All' : "Show Less"}</p>
        </div>
          <div className="grid grid-cols-4 gap-6 ">
            {this.state.data?.slice(0, this.state.productSlice).map((item: ProductsData) => (
              <a href={`/about/${item.id}`} onClick={() => window.localStorage.setItem('productId', JSON.stringify(item.id))} className="col-span-1 hover:shadow-lg duration-300 flex flex-col h-[400px] border " key={item.id}>
                <div className="relative py-10">
                  <img
                    src={item.image}
                    className="h-[200px] w-[200px] object-contain mx-auto"
                    alt=""
                  />
                  <p
                    className={`${
                      categoriesColor[item.category]
                    } absolute bottom-3 left-3`}
                  >
                    {item.category}
                  </p>
                </div>
                <div className="p-3 flex h-full justify-between flex-col">
                  <div>
                    <h1 className="line-clamp-1 hover:underline ">
                      {item.title}
                    </h1>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400" />
                      <p className="text-neutral-500">{item.rating.rate}</p>
                    </div>
                  </div>
                  <p className="font-medium ">${item.price.toFixed()}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
