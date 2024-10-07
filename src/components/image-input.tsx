import { useLocalStorage } from "usehooks-ts";

export function ImageInput() {
  const [, setStorage] = useLocalStorage<(string | ArrayBuffer | null)[]>("images", []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setStorage((prev) => ([...prev, base64String]));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Localstorage Image</h1>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-input file-input-bordered w-full"
      />
    </div>
  );
}
