import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export function ImageList() {
  const [images, setStorage] = useLocalStorage<(string | ArrayBuffer | null)[]>(
    "images",
    [],
  );
  const [modalImage, setModalImage] = useState<string | ArrayBuffer>("");

  const showModal = (image: string) => {
    // @ts-expect-error: Property 'showModal' does not exist on type 'HTMLElement'.
    document.getElementById("show_image_modal")?.showModal();
    setModalImage(image);
  };

  const deleteSelectedImage = (image: string) => {
    images.splice(images.indexOf(image), 1);
    setStorage(images);
  };

  return (
    <>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images?.map((image, key) => (
          <div key={key} className="group relative">
            <img
              src={image as string}
              alt="Images"
              className="aspect-square w-full object-cover"
              onClick={() => showModal(image as string)}
            />
            <div className="absolute right-0 top-0 hidden p-2 text-white group-hover:block">
              <button
                onClick={() => deleteSelectedImage(image as string)}
                className="btn btn-square btn-primary btn-xs"
              >
                <svg
                  className="h-4 w-4 text-primary-content"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <dialog id="show_image_modal" className="modal">
        <div className="modal-box p-0">
          <img src={modalImage as string} alt="Modal Image" />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
