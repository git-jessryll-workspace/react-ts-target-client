import Swal from "sweetalert2";
import withReactContent, {
  ReactSweetAlertOptions,
} from "sweetalert2-react-content";

const swal = withReactContent(Swal);
interface SwalPopupProps {
  icon: string;
  title: string;
  text: string;
  position?: string;
}
export const swalPopupMessage = ({
  icon,
  title,
  text,
  position,
}: SwalPopupProps): void => {
  let pos: string = position || 'top-end';

  swal.fire({
    icon,
    title,
    text,
    position: pos,
    toast: true,
  } as ReactSweetAlertOptions);
};
