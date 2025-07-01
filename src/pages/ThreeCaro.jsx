import HeroCarosoul from "../components/Home/carosol/HeroCarosoul";
import TwoCaro from "./TwoCaro";

const ThreeCaro = () => {
    return (
		<div className="flex flex-wrap px-10 max-w-[1280px] mx-auto h-[60vh]">
			<div className="w-2/3">
				<HeroCarosoul />
			</div>
			<div className="w-1/3">
				<TwoCaro />
			</div>
		</div>
	)
}
export default ThreeCaro;