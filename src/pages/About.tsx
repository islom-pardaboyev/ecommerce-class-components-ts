import axios from 'axios'
import { Component } from 'react'
import { ProductsData } from './Home'

interface Props {
  data: ProductsData
}
const productId = JSON.parse(window.localStorage.getItem('productId') as string)
export class About extends Component <{}, Props> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {} as ProductsData
    };
    
  }
  componentDidMount(): void {
    axios.get(`https://fakestoreapi.com/products/${productId}`).then((res) => {
      this.setState({ data: res.data });
    });
  }
  render() {
    
    
    return (
      <section className='w-screen h-screen'>
        <img src={this.state.data.image} alt="" />
      </section>
    )
  }
}

export default About