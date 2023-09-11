import { Toast } from "./Toast";
import { useToastStateContext } from "../contexts"

export const  ToastContainer = () =>{
	const { toasts } = useToastStateContext();

	return (
		<div className="absolute top-5 right-5 w-fit z-50">
			<div className="max-w-xl mx-auto">
				{toasts &&
					toasts.map((toast) => <Toast id={toast.id} key={toast.id} type={toast.type} message={toast.message} />)}
			</div>
		</div>
	);
}