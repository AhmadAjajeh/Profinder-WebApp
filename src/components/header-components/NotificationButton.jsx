export default function NotificationButton() {
  return (
    <>
      <div className=" p-[6px] bg-elementLightGray dark:bg-elementGray border border-gray-300 dark:border-darkBorder rounded-full transition-colors duration-300">
        <button class="flex items-center">
          <svg
            class="w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            viewBox="0 0 512 512"
          >
            <path d="M245.5 1.4c-8.4 2.1-14.7 5.7-21.1 12.1C214.1 23.8 211 33 211 53.8v12.7l-7.8 2.9c-47 17.4-82.9 55.9-96.3 103.6-4.7 16.4-5 20.8-5.9 68-.9 49.2-1.4 55.5-7.1 79-6.2 25.3-17.5 51-32.2 73.2-6.4 9.7-12.2 17.1-27.1 34.3-6 7-3.8 18.3 4.4 22.5 3.8 1.9 5.7 2 73.8 2h70l.6 3.4c2.6 13.9 14.8 31.9 28.6 42.1 6.1 4.5 17.1 9.8 25 12.1 8.1 2.3 27.8 2.6 36 .5 25.2-6.3 46.1-25.5 53.7-49.2l2.8-8.9h69.8c67.9 0 69.9-.1 73.7-2 2.6-1.3 4.7-3.4 6-6 3.8-7.4 2.3-12.7-5.9-21.5-25.5-27.3-45.8-65-55-102.5-5.7-23.2-6.3-29.7-7.1-79-.9-47.3-1.2-51.5-5.9-68.1-13.3-47.5-50.9-87.6-97.3-104l-6.8-2.4V53.8c0-20.7-3.1-30-13.5-40.4-11.2-11.3-26.9-15.8-42-12zM263 32c6 3.1 8 7.8 8 19.2v9.3h-30V51c.1-11.2 1.6-15 7.6-18.6 4.8-2.9 9.2-3 14.4-.4zm11 59.5c14.4 2.2 23.3 5 36.5 11.4 35.3 17.3 59.2 48 68 87.1 1.4 6.1 1.9 16.1 2.5 53 .7 38 1.1 47.6 2.8 58.5 6.4 40.6 19.9 75.9 41.5 108.2 3.9 5.9 7.4 11.1 7.5 11.5.2.5-79.4.8-176.8.8s-177-.3-176.8-.8c.2-.4 3.6-5.6 7.5-11.5 21.5-32.2 35.2-68 41.5-108.1 1.7-10.9 2.1-20.7 2.8-58.6.6-36.9 1.1-46.9 2.5-53 5.6-25 16.8-45.5 34.4-63.1 11.1-11 21.3-18.2 35.5-25 21.9-10.4 46.8-14.1 70.6-10.4zm24 361.1c0 2.5-7.3 13.4-11.5 17.2-17.5 16-43.1 16.2-60.6.5-4.7-4.3-10.1-11.9-11.4-16.1l-.6-2.2h42c23.2 0 42.1.3 42.1.6zM99.6 53.9C96.4 56.1 84.2 69.3 77.5 78c-25.1 32.6-41.7 74.9-45.4 116-1.6 17.4-1.4 23.4.9 28 2.3 4.5 8 8 13 8 8.8 0 15-7.4 15-17.9 0-8.9 1.8-25.4 4.1-36.6 6.3-31.2 22.8-64.5 43.5-87.8C121.4 73.4 122 72.4 122 66.6c0-5.7-2.1-9.7-6.6-12.7-3.9-2.6-11.9-2.5-15.8 0zM396.6 53.9c-4.5 3-6.6 7-6.6 12.8 0 5.7.2 6 13.8 21.5 20.6 23.4 36.9 56.4 43.1 87.3 2.3 11.2 4.1 27.7 4.1 36.6 0 10.5 6.2 17.9 15 17.9 5 0 10.7-3.5 13-8 2.3-4.5 2.5-10.7 1-27.5-3.9-42-21-85.3-46.4-117.5-7.9-10-17.3-20.3-20.8-22.8-4.2-2.9-12-3-16.2-.3z" />
          </svg>
        </button>
      </div>
    </>
  );
}
