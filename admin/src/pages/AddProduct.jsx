import { useEffect, useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Modal from "../components/Modal";
import SpecForm from "../components/SpecForm";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import Select from "react-select";
import { getUniqueCategoriesForSelect } from "../helper/functions";

export default function AddProduct() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [specification, setSpecification] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  //state for disabling buttons
  const [mainImgButtons, setMainImgButtons] = useState(true);
  const [mainImgsButtons, setMainImgsButtons] = useState(true);

  //refs
  const mainImageRef = useRef(null);
  const imagesRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const openModal = () => {
    setIsOpenModal(true);
  };
  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5025/product/create", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        toast.error('خطا در برقراری ارتباط"');
      }
      const dataRes = await res.json();
      toast.success("با موفقیت ساخته شد");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error("خطا در برقراری ارتباط");
    }
  };

  const onSave = (data) => {
    setSpecification(data);
  };

  const deleteSpecHandler = (idx) => {
    const filteredSpecs = specification.filter((spec, index) => index !== idx);
    setSpecification(filteredSpecs);
  };

  const handleMainImage = (e) => {
    console.log(e.target);
    setMainImage(e.target.files[0]);
  };

  const handleUploadImage = async (e) => {
    const body = new FormData();
    body.append("main_image", mainImage);
    try {
      const res = await fetch(
        "http://localhost:5025/product/upload-image-main",
        {
          method: "POST",

          body,
        }
      );

      if (!res.ok) {
        console.log("not ok");
        toast.error("مشکلی در آپلود بوجود آمده");
      }
      const data = await res.json();
      setValue("images.image_main_url", data.image_main_url);
      setMainImgButtons(false);
      console.log(data);
    } catch (err) {
      toast.error("مشکلی در آپلود بوجود آمده");
    }
  };

  const handleDeleteMainImage = () => {
    setMainImage(null);
    if (mainImageRef.current) {
      mainImageRef.current.value = "";
    }
  };

  const handleImages = (e) => {
    const file = e.target.files[0];
    setImages((prev) => [...prev, file]);
    if (imagesRef.current) {
      imagesRef.current.value = "";
    }
  };

  const handleUploadImages = async (e) => {
    const body = new FormData();
    for (const item of images) {
      body.append("images", item);
    }
    try {
      const res = await fetch("http://localhost:5025/product/upload-images", {
        method: "POST",

        body,
      });

      if (!res.ok) {
        console.log("not ok");
        toast.error("مشکلی در آپلود بوجود آمده");
      }
      const data = await res.json();
      setValue("images.images_url", data.images_url);
      setMainImgsButtons(false);

      console.log(data);
    } catch (err) {
      toast.error("مشکلی در آپلود بوجود آمده");
    }
  };

  const handleDeleteImages = (idx) => {
    const filteredImages = images.filter((image, index) => index !== idx);
    setImages(filteredImages);
  };

  const handleCategoryChange = (e) => {
    setValue("categoryId", e.value);
  };

  const nameValue = watch("name");
  const options = getUniqueCategoriesForSelect(categories);

  // Use useEffect to update the slug whenever the nameValue changes
  useEffect(() => {
    if (nameValue) {
      const slugValue = nameValue.replace(/\s+/g, "-").toLowerCase();
      setValue("slug", slugValue); // Update the value in react-hook-form
    } else {
      setValue("slug", ""); // Reset if the name is empty
    }
  }, [nameValue, setValue]);

  //listener for specification
  useEffect(() => {
    if (specification) {
      setValue("specification", specification);
    }
  }, [specification, setValue]);

  console.log(watch("slug"));

  useEffect(() => {
    setIsLoadingCategory(true);
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://localhost:5025/category/get-all-categories"
        );
        const data = await res.json();

        setCategories(data.categories);
      } catch (err) {
        toast.error("ارتباط برقرار نشد");
      } finally {
        setIsLoadingCategory(false);
      }
    };
    fetchCategories();
  }, []);

  //for react-select style
  const isDarkMode = document.documentElement.classList.contains("dark");

  console.log(isDarkMode);

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: isDarkMode && "#334155",
    }),
    option: (styles, { isSelected }) => ({
      ...styles,
      color: isSelected ? "#faf3f" : "#9aabc6", // White text when selected, gray when not
    }),
    singleValue: (styles) => ({
      ...styles,
      color: isDarkMode && "#fff", // Ensures the selected option text is white
    }),
    input: (styles) => ({ ...styles, color: "#fff" }),
  };

  return (
    <main className="w-full dark-mode transition duration-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[900px] shadow-md rounded-sm p-4  mx-auto flex flex-col gap-4"
      >
        {/** for category */}
        {!isLoadingCategory ? (
          <div className="flex flex-col gap-1 text-gray-500 text-sm">
            <label>شاخه مورد نظر</label>
            <Select
              styles={selectStyles}
              options={options}
              onChange={handleCategoryChange}
            />
          </div>
        ) : (
          <LoadingDots />
        )}
        {/** for name input */}
        <div className="flex flex-col gap-1 text-gray-500 text-sm">
          <label>نام محصول</label>
          <input
            {...register("name")}
            className="border rounded-md p-2 outline-none dark-mode-input"
            type="text"
          />
        </div>
        {/** for slug input */}
        <div className="flex flex-col gap-1 text-gray-500 text-sm">
          <label>اسلاگ</label>
          <input
            {...register("slug")}
            className="border rounded-md p-2 outline-none dark-mode-input"
            type="text"
            defaultValue={watch("slug") || ""}
            readOnly
          />
        </div>
        {/** for تایتل input */}
        <div className="flex flex-col gap-1 text-gray-500 text-sm">
          <label>عنوان</label>
          <input
            {...register("title")}
            className="border rounded-md p-2 outline-none dark-mode-input"
            type="text"
          />
        </div>
        {/** for desription */}
        <div className="flex flex-col gap-1 text-gray-500 text-sm">
          <label>توضیحات</label>
          <textarea
            {...register("description")}
            className="border rounded-md p-2 outline-none dark-mode-input"
            type="text"
          />
        </div>
        {/** for quantity input */}
        <div className="flex flex-col gap-1 text-gray-500 text-sm">
          <label>تعداد</label>
          <input
            {...register("quantity")}
            className="border rounded-md p-2 outline-none dark-mode-input"
            type="text"
          />
        </div>
        {/** for specification */}
        <div className="flex flex-col gap-1 text-gray-500 text-sm">
          <label>اضافه کردن مشخصات</label>
          <button
            type="button"
            className="bg-blue-500 w-fit p-1 rounded-lg text-white hover:text-gray-300 transition"
            onClick={openModal}
          >
            <IoIosAdd className="text-2xl" />
          </button>
          <Modal openModal={isOpenModal} onClose={onCloseModal}>
            <SpecForm
              onSave={onSave}
              onClose={onCloseModal}
              register={register}
            />
          </Modal>

          {/** when we add specifications */}
          {specification.length > 0 && (
            <div className="border rounded-md p-2 flex gap-2">
              {specification.map((spec, idx) => (
                <div
                  className="bg-blue-500 text-white p-1 rounded-md flex gap-6 items-center"
                  key={spec.name}
                >
                  <div className="flex gap-2">
                    <label>نام:</label>
                    <span>{spec.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <label>مقدار:</label>
                    <span>{spec.value}</span>
                  </div>
                  <div>
                    <MdDelete
                      onClick={() => deleteSpecHandler(idx)}
                      size={18}
                      className="cursor-pointer hover:text-gray-300 transition"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/** for Image input */}
        <div className="flex flex-col gap-1 text-gray-500 text-sm">
          <div className=" py-2 border-b mb-4">
            <label className="">اضافه کردن عکس</label>
          </div>
          <div className="flex flex-col justify-center">
            {mainImgButtons ? (
              <div className="flex gap-4 items-center">
                <label className="">اضافه کردن عکس اصلی</label>
                <label
                  className="bg-blue-500 w-fit p-1 rounded-lg text-white hover:text-gray-300 transition inline-block cursor-pointer"
                  htmlFor="add_image"
                >
                  <IoIosAdd className="text-2xl" />
                </label>
                <input
                  ref={mainImageRef}
                  onChange={handleMainImage}
                  type="file"
                  className="hidden"
                  id="add_image"
                />
                {mainImage && (
                  <button
                    type="button"
                    onClick={handleUploadImage}
                    className="bg-blue-500 w-fit px-2 py-1 rounded-lg text-white hover:text-gray-300 transition  cursor-pointer"
                  >
                    آپلود
                  </button>
                )}
              </div>
            ) : (
              <TiTick color="green" size={50} />
            )}

            {/** set the image window */}
            {mainImage && (
              <div className="mt-2">
                <div className=" flex flex-col gap-1">
                  <img
                    className="size-24 rounded-sm object-cover shadow-md"
                    src={URL.createObjectURL(mainImage)}
                  />
                  {mainImgButtons && (
                    <button
                      className="w-fit  bg-blue-500 p-2 rounded-sm text-white"
                      type="button"
                      onClick={handleDeleteMainImage}
                    >
                      حذف
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/** Add images */}
          <div className="mb-4 mt-4 py-2 flex flex-col gap-2">
            {mainImgsButtons ? (
              <div className=" flex gap-4 items-center">
                <div>
                  <label>اضافه کردن عکس ها</label>
                </div>
                <div className="flex gap-4">
                  <label
                    className="bg-blue-500 w-fit p-1 rounded-lg text-white hover:text-gray-300 transition inline-block cursor-pointer"
                    htmlFor="add_images"
                  >
                    <IoIosAdd className="text-2xl" />
                  </label>
                  <input
                    ref={imagesRef}
                    onChange={handleImages}
                    type="file"
                    className="hidden"
                    id="add_images"
                  />
                  {images.length > 0 && (
                    <button
                      type="button"
                      onClick={handleUploadImages}
                      className="bg-blue-500 w-fit px-2 py-1 rounded-lg text-white hover:text-gray-300 transition  cursor-pointer"
                    >
                      آپلود
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <TiTick size={50} color="green" />
            )}
            {images.length > 0 && (
              <div className="flex items-center gap-4 flex-wrap">
                {images.map((image, idx) => (
                  <div key={idx} className="flex gap-1 flex-col ">
                    <img
                      className="size-24 object-cover rounded-sm"
                      src={URL.createObjectURL(image)}
                    />
                    {mainImgsButtons && (
                      <button
                        className="w-fit bg-blue-500 p-2 rounded-sm text-white"
                        type="button"
                        onClick={() => handleDeleteImages(idx)}
                      >
                        حذف
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300"
          type="submit"
        >
          ارسال
        </button>
      </form>
    </main>
  );
}

const LoadingDots = () => {
  return (
    <div
      dir="ltr"
      className="flex items-center justify-center space-x-1 text-blue-500 text-lg font-semibold"
    >
      <span>Loading</span>
      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-150"></div>
      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-300"></div>
    </div>
  );
};
