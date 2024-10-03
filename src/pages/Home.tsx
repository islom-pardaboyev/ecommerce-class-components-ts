import axios from "axios";
import { Component } from "react";
import { CgEye } from "react-icons/cg";
import { FaStar } from "react-icons/fa6";
export const categoriesColor: { [key: string]: string } = {
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

export interface ProductsData {
  id: number;
  title: string;
  price: number;
  description: string;
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
          
            <h1 className="text-3xl font-medium">Products</h1>
          
          <div className="grid grid-cols-4 gap-6 ">
            {this.state.data
              ?.slice(0, this.state.productSlice)
              .map((item: ProductsData) => (
                <a
                  href={`/about/${item.id}`}
                  onClick={() =>
                    window.localStorage.setItem(
                      "productId",
                      JSON.stringify(item.id)
                    )
                  }
                  className="col-span-1 hover:shadow-lg duration-300 flex flex-col h-[400px] border "
                  key={item.id}
                >
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
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <p className="text-neutral-500">{item.rating.rate}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-2xl text-neutral-600">
                        ${item.price.toFixed()}
                      </p>
                      <span className="p-3 border border-transparent hover:border-neutral-400 hover:shadow-xl duration-300 rounded-full">
                      <CgEye className="scale-125"/>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
          </div>
          <button
              className="font-medium text-lg select-none w-full bg-neutral-300 py-3 rounded-md mt-5 hover:bg-neutral-400/80 cursor-pointer duration-300"
                    onClick={() => {
                      if (this.state.data) {
                        this.setState({
                          productSlice:
                            this.state.productSlice < this.state.data.length ? this.state.productSlice + 6 : 4,
                        });
                      }
                    }}
            >
              {this.state.data && this.state.productSlice <= this.state.data.length ? (
                "Show More (6)"
              ) : (
                "Show Less (4)"
              )}
            </button>
        </div>
      </section>
    );
  }
}

export default Home;
