import Image from "next/image";
import Hero from "./components/landing/hero";
import Hiw from "./components/landing/Hiw";
import Foot from "./components/Foot";
import Catagory from "./components/landing/Catagory";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero/>
      <Catagory/>
      <Hiw/>
      <Foot/>
    </div>
  );
}



// "use client";

// import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
// import { setUser, clearUser, updateUser } from "@/app/store/Userdata_slice";

// export default function Home() {
//   const { user, isAuthenticated, loading } = useAppSelector(
//     (state) => state.userData
//   );
//   const dispatch = useAppDispatch();

//   const handleLogin = () => {
//     dispatch(
//       setUser({
//         id: "1",
//         name: "John Doe",
//         email: "john@example.com",
//         skills: ["React", "TypeScript", "Next.js"],
//         bio: "Full-stack developer",
//       })
//     );
//   };

//   const handleLogout = () => {
//     dispatch(clearUser());
//   };

//   const handleUpdateName = () => {
//     dispatch(updateUser({ name: "Jane Doe" }));
//   };

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 p-8 text-black font-sans dark:bg-white">
//       <h1 className="text-3xl font-bold">SkillDAO</h1>

//       {isAuthenticated && user ? (
//         <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-md">
//           <div className="text-center">
//             <h2 className="text-xl font-semibold">{user.name}</h2>
//             <p className="text-gray-600">{user.email}</p>
//             {user.bio && <p className="mt-2 text-gray-500">{user.bio}</p>}
//             {user.skills && (
//               <div className="mt-3 flex flex-wrap gap-2 justify-center">
//                 {user.skills.map((skill) => (
//                   <span
//                     key={skill}
//                     className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={handleUpdateName}
//               className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//             >
//               Update Name
//             </button>
//             <button
//               onClick={handleLogout}
//               className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center gap-4">
//           <p className="text-gray-600">You are not logged in</p>
//           <button
//             onClick={handleLogin}
//             className="rounded-lg bg-green-500 px-6 py-3 text-white hover:bg-green-600"
//           >
//             Login
//           </button>
//         </div>
//       )}

//       <p className="mt-4 text-sm text-gray-400">
//         User data is persisted in localStorage
//       </p>
//     </div>
//   );
// }
