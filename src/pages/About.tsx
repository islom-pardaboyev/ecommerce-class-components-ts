import axios from "axios";
import { Component } from "react";
import { categoriesColor, ProductsData } from "./Home";
import { FaStar } from "react-icons/fa6";

interface Props {
  data: ProductsData;
  isLoading: boolean;
}
const productId = JSON.parse(
  window.localStorage.getItem("productId") as string
);
export class About extends Component<{}, Props> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {} as ProductsData,
      isLoading: true,
    };
  }
  componentDidMount(): void {
    axios.get(`https://fakestoreapi.com/products/${productId}`).then((res) => {
      this.setState({ data: res.data });
      this.setState({isLoading: !this.state.isLoading})
    });
  }
  render() {
    console.log(this.state.data);

    if(this.state.isLoading){
      return (
        <section className="flex items-center justify-center h-screen">loading...</section>
      )
    }

    return (
      <section className="w-screen h-screen flex items-center justify-center">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 ">
            <div className="col-span-1">
              <img
                className="h-[300px] mx-auto"
                src={this.state.data.image}
                alt=""
              />
            </div>
            <div className="col-span-1">
              <h1 className="font-medium text-neutral-400">
                {this.state.data.title}
              </h1>
              <h1 className="font-medium  text-3xl">
                ${this.state.data.price}
              </h1>
              <h1 className={`${categoriesColor[this.state.data.category]}`}>
                {this.state.data.category}
              </h1>
              <h1 className="font-medium capitalize mt-5 text-neutral-600">
                {this.state.data.description}
              </h1>
              <div className="flex items-center mt-5 gap-16">
                <p className="flex items-center gap-3 font-bold text-neutral-400">
                  Rate:{" "}
                  <span className="flex items-center gap-2">
                    {this.state.data.rating?.rate}{" "}
                    <FaStar className="text-yellow-500" />
                  </span>
                </p>
                <p className="flex items-center gap-3 font-bold text-neutral-400">
                  Count: <span>{this.state.data.rating?.count}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
