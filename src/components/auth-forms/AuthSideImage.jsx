import AuthIllustration from "../../assets/images/illustration-5.png";
import { getDirection } from "../../util/lang";

export default function AuthSideImage() {
  return (
    <div
      class={`hidden xl:flex justify-center items-center max-h-screen rtl:space-x-reverse `}
    >
      <img class="rounded-xl  md:w-[600px]" src={AuthIllustration} />
    </div>
  );
}
