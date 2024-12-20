import logoImage from '../../assets/images/logo.png';

export default function SmallLogoImage({ style }) {
  return (
    <div class="flex items-center shadow-sm">
      <img class={style} src={logoImage} />
    </div>
  );
}
