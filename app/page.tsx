import Hero from "@/components/Hero";
import LayoutProvider from "@/providers/LayoutProvider";

const Home = () => {
  return (
    <div>
    <LayoutProvider><Hero /></LayoutProvider> 
    </div>
  );
};

export default Home;
