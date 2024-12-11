# Changelog

## [0.35.0](https://github.com/explore-siargao/es-main/compare/v0.34.0...v0.35.0) (2024-12-11)


### 🚀 Features

* Added manual card and save card payment ([2c772e8](https://github.com/explore-siargao/es-main/commit/2c772e8a2b80f5e4caa08da5e6d832483c9864c1))
* **api:** Added endpoint for paying reservations using manual input of card ([4690191](https://github.com/explore-siargao/es-main/commit/4690191241391b2ce99434c3603ca7c0b87991ab))
*  **api.** Added endpoint for payments using card ([f61b985](https://github.com/explore-siargao/es-main/commit/f61b985fbd64d64dcf9f53870dd003e0bf017fb0))
*  Added items to bookable units seeders and added zod apiService for card payment ([58963ef](https://github.com/explore-siargao/es-main/commit/58963efe134d68e42a806eef5d5ab4b00f75f14f))
* **api:** Added input and output zod validation in filter endpoint ([345b233](https://github.com/explore-siargao/es-main/commit/345b2333e4d7f232cc1781e5abd686517207a603),[6cb8d0e](https://github.com/explore-siargao/es-main/commit/6cb8d0e5ee7557d1d8a473b0be6d4e3956a602e3),[cd7a9d9](https://github.com/explore-siargao/es-main/commit/cd7a9d93b723ba7915d35893509b9e35bb58a72e))
* **api:** Modified logic for saving and updating facilities, amenities, and policies ([28d17f8](https://github.com/explore-siargao/es-main/commit/28d17f87b0581c02cdac1670c97fd7a6d972f766))
* **api:** Modified the carts endpoints ([f30e5c1](https://github.com/explore-siargao/es-main/commit/f30e5c17e5b9fe58a8166417d1c72a2f52bfe8d3))
* Cart enhancement ([75c5d78](https://github.com/explore-siargao/es-main/commit/75c5d781de679151a678caed266da2549ef1d55b)), **web:** cart enhancement ([782a0d5](https://github.com/explore-siargao/es-main/commit/782a0d55206bd07107ecc6a4cbf8c5b57fd4a4cd), [bcc135c](https://github.com/explore-siargao/es-main/commit/bcc135c9a2f10ffbe89cc636638c37b7b9ef1902))

### 🛠 Bug Fixes

* **api:** Fixed bug on resetting finishSections in all categories ([4209409](https://github.com/explore-siargao/es-main/commit/420940943ecef7c96f37453eee054b38c57ff1e5))
* Change activities to properties map card URL ([17d2c77](https://github.com/explore-siargao/es-main/commit/17d2c77ed0e17f862a675377647a6c2fad644bea))
* Remove services in root package.json ([4b291cd](https://github.com/explore-siargao/es-main/commit/4b291cde50f41927badb2d88ffc2ef7a295e5e2a))

### 🧰 Maintenance

* Change map of properties search ([6ecaa86](https://github.com/explore-siargao/es-main/commit/6ecaa86b5587bfc2962fdea4ce3ddd55330f6622))
* Change top info header text ([7eab9b0](https://github.com/explore-siargao/es-main/commit/7eab9b0c1394a7c49a42c602deadd208f61b3cec))
* Cleanup public listing property units and pledge card ([9429780](https://github.com/explore-siargao/es-main/commit/94297808f396ed0fe6236409509f850dda18e35d))
* Fix map on initial scroll in search pages ([cbeab93](https://github.com/explore-siargao/es-main/commit/cbeab93ce3db88c9f4c947c1073c855802f26c9f))
* Fix summary info data of property ([f7a7989](https://github.com/explore-siargao/es-main/commit/f7a79898230d138455772d8a17beb83bb6670ba6))
* Fix type error for image gallery ([7b822b5](https://github.com/explore-siargao/es-main/commit/7b822b50439c38e222373da9aba67c4037622763), [08203da](https://github.com/explore-siargao/es-main/commit/08203da5cac66cf04586ec8e5baeadd1a0a37378))
* Increase size of checkout box in property ([fc2bd19](https://github.com/explore-siargao/es-main/commit/fc2bd190373d65e5c577d175f3c9dc2fa6f74d5a))
* Remove itinerary builder client request for public listing activity ([feb8ca5](https://github.com/explore-siargao/es-main/commit/feb8ca5028c61ef2f51aa56f83a0cc2f5d188844))
* Update image gallery for listing ([45bfb91](https://github.com/explore-siargao/es-main/commit/45bfb91c1d76b973fc16581257fd4db0234127bd))


## [0.34.0](https://github.com/explore-siargao/es-main/compare/v0.33.0...v0.34.0) (2024-12-02)

### 🚀 Features

- **api:** Added endpoint for payment using card ([e336ee4](https://github.com/explore-siargao/es-main/commit/e336ee42b93600bd6443977b193ee2b87b4547ce))
- **api:** Moved the seeder from test to es-main ([928ef04](https://github.com/explore-siargao/es-main/commit/928ef040900532dd6c4b52aa3f822438ed878c17), [1555d73](https://github.com/explore-siargao/es-main/commit/1555d73bc7fb072b8c7b3dd8eeb17b3ec649d3c5), [12ae929](https://github.com/explore-siargao/es-main/commit/12ae929766c393af2eb4a63b9e9c75ac4fd7ac19))
- **cart:** Implemented cart feature for adding and managing bookable items across sessions ([47cc296](https://github.com/explore-siargao/es-main/commit/47cc296ac26c59317513c9d3a63194fdd7779dce), [91bc2a1](https://github.com/explore-siargao/es-main/commit/91bc2a1beffecb5b6b1de21d2fb0007241dd2d42), [418c3d8](https://github.com/explore-siargao/es-main/commit/418c3d8805357c661eb0861a32c6f4498471288d), [9eda292](https://github.com/explore-siargao/es-main/commit/9eda2921a1a7d3da2acf7afe5afdf66632d7928e))
- **api:** Move dummy data to actual data for activity, rental, and property lists in the home page ([e2b4000](https://github.com/explore-siargao/es-main/commit/e2b40007cbc89a51231f0500f471bda2492bdc09))
- **web:** Cleanup ([c2e3229](https://github.com/explore-siargao/es-main/commit/c2e322985fa80f835226148dec67dd3abf0ca654))

### 🛠 Bug Fixes

- **api:** Fixed bug on activities filter endpoint ([b23616b](https://github.com/explore-siargao/es-main/commit/b23616b3d8d4245b6c3bc081dea580c3a5145996))
- Removed filters from non-search pages ([0c346e6](https://github.com/explore-siargao/es-main/commit/0c346e6e3f5675545af0f0be31093d5596d229b9))

### 🧰 Maintenance

- Cleanup `isUserLoggedIn` middleware for search filters endpoints ([e994250](https://github.com/explore-siargao/es-main/commit/e9942506c011353077d9bc2b2b52b187c662f05d))
- Disabled public endpoint of listing to show all status for all categories ([8090225](https://github.com/explore-siargao/es-main/commit/8090225902e2e7229f7e261a0a60805a073e0039))
- Fixed type build errors ([2e11276](https://github.com/explore-siargao/es-main/commit/2e112764859ed218b232df7fdfdcdfd535259a59))
- Migrated landing page folder structures and files ([8f0f7ce](https://github.com/explore-siargao/es-main/commit/8f0f7cee35b43c011f5fd362694f1a9050c27518))
- Removed guest default for activity search ([3c3e2ec](https://github.com/explore-siargao/es-main/commit/3c3e2ec369b5a10c98db03669aaa00f73516e9df))
- Removed static project images and corresponding components and pages ([dd2ee2a](https://github.com/explore-siargao/es-main/commit/dd2ee2ae9c031467c3c7bdbc2babeee3cd84cc7d))
- Updated explore island items in the homepage ([8a91b47](https://github.com/explore-siargao/es-main/commit/8a91b474fd6e5cabd19bf45da274119c0c59c69b))
- Updated home page cards images and links ([e00a6ef](https://github.com/explore-siargao/es-main/commit/e00a6ef93e8241d74746efcbfadb9b1013e1d3e0))

## [0.33.0](https://github.com/explore-siargao/es-main/compare/v0.32.0...v0.33.0) (2024-11-20)

### 🚀 Features

- Added currency header in contract api service ([c9cf34b](https://github.com/explore-siargao/es-main/commit/c9cf34bafff4c77997224a944ac60e0b21d864f6))
- Added endpoint for checking out cart items to reservations and updated hook on payment success on frontend ([d8aab5b](https://github.com/explore-siargao/es-main/commit/d8aab5be918828ab2b7831e7c4f133daa28961d8))
- Added pagination for search page result for all category ([9a68bfc](https://github.com/explore-siargao/es-main/commit/9a68bfca827f1ec973aef9deb251c97bfac03c9e))
- **api:** Added endpoint for cart to reservations ([d67d063](https://github.com/explore-siargao/es-main/commit/d67d063f83bf3feec11d93c8ec719b3b18d63689))
- **api:** Added endpoint for multiple reservations and payment ([e8de861](https://github.com/explore-siargao/es-main/commit/e8de861685717a70aa30ea9c7a0ee7f34ce29d84))
- **api:** Converted all related to price rates on calendar and filter endpoints ([03a86ea](https://github.com/explore-siargao/es-main/commit/03a86eac1ffcc8c85a98414325915a917fdad7be))
- Make main search bar only accepts location for search and added loading icon for its button ([fd12f8a](https://github.com/explore-siargao/es-main/commit/fd12f8a9776309cd7f8ecf962e8bfc611eb62ed0))
- Pagination of search page flatten need to come from the backend ([4d564e1](https://github.com/explore-siargao/es-main/commit/4d564e1e031ff84b2cf7bb531fb3c450597a58a7))
- **web:** Modified units in public page listing ([ba49f0c](https://github.com/explore-siargao/es-main/commit/ba49f0c0d71c2be0fc0019dae2c1c0b99e6deab9))

### 🛠 Bug Fixes

- Change date converstion to toISOString for calendar ([06d1eff](https://github.com/explore-siargao/es-main/commit/06d1efffbe1c7bb89b70ef19cb0950b99968f585))
- change price per date type contract directory ([8efa2c9](https://github.com/explore-siargao/es-main/commit/8efa2c9b224717c80d0d08578e6e42fd485e3563))
- console errors for next image ([4cf07d5](https://github.com/explore-siargao/es-main/commit/4cf07d5d476c14916575f08741b5bce93c5840dc))
- Move calendar localdatestring to isodatestring ([06c5666](https://github.com/explore-siargao/es-main/commit/06c56661190f7f159e14d97b9c74d1854893857b))

### 🧰 Maintenance

- change listing public page url ([1e5c331](https://github.com/explore-siargao/es-main/commit/1e5c331e41a9a8d69093349f10f57d70c2aba839))
- made the rentals and activities url and tabs plural ([8e880a4](https://github.com/explore-siargao/es-main/commit/8e880a482e53114a517df86969bf293583fd89b9))
- made the text smaller on listing cards ([128faf8](https://github.com/explore-siargao/es-main/commit/128faf8d08f878b2f5d97ec3b5a8cf7a847723c8))
- revert the update search params for listing search ([5a3f755](https://github.com/explore-siargao/es-main/commit/5a3f75581a4c67b979dcd6846ce90c01f0092e67))

## [0.32.0](https://github.com/explore-siargao/es-main/compare/v0.31.0...v0.32.0) (2024-11-14)

### 🚀 Features

- added validation for currency conversion ([04451c8](https://github.com/explore-siargao/es-main/commit/04451c81814ef28393337e045a8b561632d450b5))
- **api:** Added endpoint for getting either all reservations or carts list ([a7fa7bb](https://github.com/explore-siargao/es-main/commit/a7fa7bb6c0df136676d9c647cd94e5cfc2be7043))
- **api:** Added endpoint for removing multiple items from carts ([1b81478](https://github.com/explore-siargao/es-main/commit/1b8147872c928e67dd133521d6248fea3f55c1d9))
- **api:** Added endpoint for updating cart item info ([e8b5d0f](https://github.com/explore-siargao/es-main/commit/e8b5d0f0ea4b2955c2dea77be37df40dbf36c326))
- **api:** Created middleware for handling currency and create reusable function for conversion rates ([ad1fb3f](https://github.com/explore-siargao/es-main/commit/ad1fb3f77ee20b48957187657b14597d205324aa))
- **api:** Separted get all carts and reservation to different endpoint and apply the contract to get all cart endpoint ([877f408](https://github.com/explore-siargao/es-main/commit/877f4086b7aafdf349de06c019e5bfc233823425))
- Connect search page fetch to contract and sync types ([8bf534d](https://github.com/explore-siargao/es-main/commit/8bf534d6f876c681998690b468af1fcc57673900))
- Require all search and filter value to be in the url ([c84bb74](https://github.com/explore-siargao/es-main/commit/c84bb742b0577efb02cae020bbcce7a8182c74c5))
- Sync filters and ur search data and unify the value to the endpoints ([5b2c48c](https://github.com/explore-siargao/es-main/commit/5b2c48cb9a33ca545c4dd072ca8cc93c720388b3))
- Update formatCurrency to support 7 specifics ([6a5f551](https://github.com/explore-siargao/es-main/commit/6a5f551ad8cbbf2cf3a0b35c4ff871312babf83e))

### 🛠 Bug Fixes

- **api:** made price conversion middleware work even without currency header ([6f1daa7](https://github.com/explore-siargao/es-main/commit/6f1daa70d1842789bda3fef5a451935c36a1938b))
- Change filtered endpoints keys to sync with the contract ([ed813c3](https://github.com/explore-siargao/es-main/commit/ed813c3e9de247a61a55e0fcf7dd901f2e9dfe0d))

### 🧰 Maintenance

- added exchangerate api to deployment scripts ([500c328](https://github.com/explore-siargao/es-main/commit/500c328664075341ae72df8a4f093ccf87db4add))
- Added new global package contract-2 to dockerfile deployment ([b37b484](https://github.com/explore-siargao/es-main/commit/b37b484fc3a16beb3c5e27a6d8db627b90eee88b))
- fix formatCurrency and props value for photo ([091bf84](https://github.com/explore-siargao/es-main/commit/091bf846383186f120ae403ebe56c3f025ad5410))
- restructure folder for search and listing ([d4cd326](https://github.com/explore-siargao/es-main/commit/d4cd32693a698190a9567209f310ee4c4509ab3a))

## [0.31.0](https://github.com/explore-siargao/es-main/compare/v0.30.0...v0.31.0) (2024-11-06)

### 🚀 Features

- **api:** Added additional filter options for rentals ([f053d15](https://github.com/explore-siargao/es-main/commit/f053d152fb470cda9943927c64e547a605b761ee))
- **api:** Added additional needed parameters to activities filter endpoints ([cd5ccdb](https://github.com/explore-siargao/es-main/commit/cd5ccdb93ec399c0829ff5dbe03969368c0afb06))
- **api:** Added endpoint for adding items to carts ([0d17890](https://github.com/explore-siargao/es-main/commit/0d17890fb52e94386eb6b16baeaeba37b8002635), [ab2cc62](https://github.com/explore-siargao/es-main/commit/ab2cc6234381a65c071139899af9aac3114834da))
- **api:** Added endpoint for removing items from carts ([ffff59a](https://github.com/explore-siargao/es-main/commit/ffff59a342c3922b1e001df57653151f9bcf1ec5))
- **api:** Added needed query parameters for filtering bookable units ([dd12de7](https://github.com/explore-siargao/es-main/commit/dd12de73b18c714848f80574cf9ef8ee27dff67c))
- **api:** Created a new model for Carts to handle user carts and items ([be488be](https://github.com/explore-siargao/es-main/commit/be488be3b1b946bd2d87c15e7e6d5f9a60919e2f))
- **api:** Adjusted rental count retrieval for cars, motorbikes, and bikes ([dae557b](https://github.com/explore-siargao/es-main/commit/dae557b311779d07197d610b8f99d0df25a95c26))
- **api:** Modified endpoints to include maxGuests for bookable unit updates ([5cd8f4c](https://github.com/explore-siargao/es-main/commit/5cd8f4cee30e39106f1a4ee9afd7bf0fadeedfd9))

### 🧰 Maintenance

- Added `contract-2` for new fetch function implementation ([bc6f263](https://github.com/explore-siargao/es-main/commit/bc6f263073ae52f71875472d12e826cb83c079c4))
- Added global HMAC service and new pattern for contract API requests ([ed84dfd](https://github.com/explore-siargao/es-main/commit/ed84dfd016a498cdb07b76d7dfe27619b2b86732))
- Renamed `cart2` contract to `cart` ([97d9e60](https://github.com/explore-siargao/es-main/commit/97d9e60c4dc1fe820e55f3b7f68e34ca40b32b21))
- Removed `cart` from contract ([a294e6d](https://github.com/explore-siargao/es-main/commit/a294e6db1bc08c13b7674a4c64991eeac2fc28d2))

## [0.30.0](https://github.com/explore-siargao/es-main/compare/v0.29.0...v0.30.0) (2024-10-30)

### 🚀 Features

- **api:** Added collection schema for reviews ([01688fc](https://github.com/explore-siargao/es-main/commit/01688fc923560d398f16c2213f5dc52a61e659df))
- **api:** Added endpoint for adding review on bookable unit, activity and rentals ([5d88341](https://github.com/explore-siargao/es-main/commit/5d88341482099420acdfc03b875b19000c28cbe2))
- **api:** Added endpoint for getting highest price on bookable unit,rental and activities ([71f3ecf](https://github.com/explore-siargao/es-main/commit/71f3ecf975fdf3c1b0a8974548bc8d85c17377e9))
- **api:** Added stars filtering in activities, rentals and units ([2345d4f](https://github.com/explore-siargao/es-main/commit/2345d4f982d97767648e5c842c4e1b0b073f214b))

### 🛠 Bug Fixes

- **web:** Rename bike-related constants, stores, and query keys to car-related counterparts in 'car-calendar-table' and 'motor-calendar-table' components ([c31a0a6](https://github.com/explore-siargao/es-main/commit/c31a0a6b2c881ea2a820a006e94f167236a0efe3))
- **web:** Remove unnecessary console log for dayOfWeek variable in getSlotsByDate function fix(api): Add additional conditions to check for overlapping reservations with different statuses, startDate, and dayId, Set refetchOnWindowFocus option to false in useGetPrivateActivities hook, Set refetchOnWindowFocus option to false in useGetJoinerActivities hook ([10151eb](https://github.com/explore-siargao/es-main/commit/10151eb1bfa5af31eedf398452c02835a586f066))

## [0.29.0](https://github.com/explore-siargao/es-main/compare/v0.28.1...v0.29.0) (2024-10-28)

### 🚀 Features

- **api:** Added endpoint for filtering properties using different variables ([629afd9](https://github.com/explore-siargao/es-main/commit/629afd96235844ff1de46484cc77314cfca08965))
- **api:** Changed logic for filtering rentals using rental category and activities using experience type ([cab3009](https://github.com/explore-siargao/es-main/commit/cab30099181c79d197909b147252a4e3c01317ba))
- **api:** Converted params to query params and added more filter options in activities ([ca0b3ad](https://github.com/explore-siargao/es-main/commit/ca0b3adebb08370ae0ff541973b3d3e5e2f15057)), ([078b72e](https://github.com/explore-siargao/es-main/commit/078b72e4483b44260fa03f841246811a4de85ccb))
- Search page listing cards and map ([b4de122](https://github.com/explore-siargao/es-main/commit/b4de12295699040c910bb4c5caabffd6bc2492e8))
- **web:** Create second level header for search page ([f1f43aa](https://github.com/explore-siargao/es-main/commit/f1f43aac06c38b39f7252085c23aa7bd85f40a3f)), ([4862646](https://github.com/explore-siargao/es-main/commit/48626468f5dc396c96ea237e583502cc252dd02b))

### 🧰 Maintenance

- Added ai-code-reviewer ([1efe55d](https://github.com/explore-siargao/es-main/commit/1efe55da364b4536a2ba8c359d4dc767dae6ec92))
- Change directory of .env in npm scripts ([9ff6a76](https://github.com/explore-siargao/es-main/commit/9ff6a7620d0363e5ccaa3280aeed25bccc65c014)), Change env_file path dir ([678e2d4](https://github.com/explore-siargao/es-main/commit/678e2d4bcc46cafc09499968b76100a8e41b79d7)), ([c1ee536](https://github.com/explore-siargao/es-main/commit/c1ee536aec90fdd0157e3b118a9eb6a7d2ccab04))
- Fix wording for property unit pricing ([de5d01d](https://github.com/explore-siargao/es-main/commit/de5d01d4916208c59d5197320ab51edbf597b568))
- Remove env_file from yml and put it in the npm scripts ([d36ebeb](https://github.com/explore-siargao/es-main/commit/d36ebeb9ed793b341c2aae2a68d35c2947983794)), Remove github workflow env vars ([bbbd027](https://github.com/explore-siargao/es-main/commit/bbbd0275121b6d0cbc925cb18e614b74984ec45c))
- Reverse comment of .env echo file ([5aa323b](https://github.com/explore-siargao/es-main/commit/5aa323b05fffa964c7c978eed21d0c93dba70f5b)), Reverse dummy.tsx and change env on Dockerfiles ([4f90e86](https://github.com/explore-siargao/es-main/commit/4f90e861da3faed2e7bb3963a892720ad150c09f))
- Revert deployment env keys and update key for ai code reviewer ([928da65](https://github.com/explore-siargao/es-main/commit/928da654889f622a36f2c7a76c2cf4793ca09afd))
- Update sit deployment for test ([6ef9929](https://github.com/explore-siargao/es-main/commit/6ef99292bce266194159ed56339c972ddaaf4ca4))

## [0.28.1](https://github.com/explore-siargao/es-main/compare/v0.28.0...v0.28.1) (2024-10-20)

### 🧰 Maintenance

- Change import value for rental calendar ([0867693](https://github.com/explore-siargao/es-main/commit/08676937a496e1b2cd3deaf30104f3e3ef076ed7))
- Change module reservation calendar folder name ([ccf29da](https://github.com/explore-siargao/es-main/commit/ccf29da4f495b92872708aa896d8b94d3a9feb6b))
- Change module reservation calendar folder text case ([803ac45](https://github.com/explore-siargao/es-main/commit/803ac45c73e3ea288987ddb3503e5a8df435d3c7))
- Delete old files and update rentals legend modal ([f8caacd](https://github.com/explore-siargao/es-main/commit/f8caacd15004ed4b544ed565363127b6b3f787cb))
- Deleted old files and update module entry point for calendar rentals ([9499fd0](https://github.com/explore-siargao/es-main/commit/9499fd0dad35b5c7eee7e459110ccd1414ceff48))
- Move legends to calendar activity and property and lowercase Rental folder ([d569c83](https://github.com/explore-siargao/es-main/commit/d569c8371b1fcbe9f4c17d0af44ce72aa45ff45f))

## [0.28.0](https://github.com/explore-siargao/es-main/compare/v0.27.0...v0.28.0) (2024-10-18)

### 🚀 Features

- Added custom image component with placeholder ([6ef76b9](https://github.com/explore-siargao/es-main/commit/6ef76b9785785eb27d7d668804c1fe3b0fc2a399)) ([9f318f5](https://github.com/explore-siargao/es-main/commit/9f318f5965eb44e0831195ac2776c9e83e85cc26))
- Added loading bg color for Image ([fff7125](https://github.com/explore-siargao/es-main/commit/fff71252e4e576df77811360b48c0774d14a6349))
- **api:** Added endpoint for get activities by location and type with pagination ([8835736](https://github.com/explore-siargao/es-main/commit/8835736b09af2ca54cdbc704bb6bdf23a7336566)) ([63af136](https://github.com/explore-siargao/es-main/commit/63af13600996dcde2d0070816462a2d421f90c66))
- **api:** Added endpoint for getting properties by location and type ([e164f72](https://github.com/explore-siargao/es-main/commit/e164f725c780fd6f09ba56d798780dc348c2efba))
- **api:** Added get rentals by location and type with pagination that contain 15 items every page ([1690b8e](https://github.com/explore-siargao/es-main/commit/1690b8e46370637ca9c8ebcd016aeda6bf912550))
- Changed logic for adding joiner activities ([422aebe](https://github.com/explore-siargao/es-main/commit/422aebe1e661608a10f65d1771690334faa9ae28))
- **web:** Move the price per dates to header row on joiner activity calendar ([7b545c4](https://github.com/explore-siargao/es-main/commit/7b545c40e119335e37af9a90a5c7e59d7366931a))

### 🛠 Bug Fixes

- **api:** Fix error on not showing activity list when type of is exist on query ([df8a172](https://github.com/explore-siargao/es-main/commit/df8a172a3ab10407de9a9bc68e1e083861f8ac63))
- **api:** Fixed activity reservation blocked color not changing ([f9a5faa](https://github.com/explore-siargao/es-main/commit/f9a5faa9c3933945edbff9e90e87d97fff14efd9))
- Bed unit not displaying correct name in listing process ([e5dd5e2](https://github.com/explore-siargao/es-main/commit/e5dd5e208e3b8b6f5681bcdcb6d02ac66e1054b8))
- **web:** Fixed bug on adding private activity reservation ([6f7f959](https://github.com/explore-siargao/es-main/commit/6f7f95920152f01f176a4e20daaa5ef3c06c93c6))

## [0.27.0](https://github.com/explore-siargao/es-main/compare/v0.26.1...v0.27.0) (2024-10-14)

### 🚀 Features

- Added cancel for property unit name edit ([423003d](https://github.com/explore-siargao/es-main/commit/423003d26f4d413325182325d2f5659bc0ae8c89))
- Added Pricing, Experience Type and Categories in activity summary ([afb0bcb](https://github.com/explore-siargao/es-main/commit/afb0bcb165f3842162f234d36ef10058adc80067))
- Added Property cancellation function ([1450f83](https://github.com/explore-siargao/es-main/commit/1450f83d1a47629e6c38ba93f2f77f15199c4abe))
- **api:** Added endpoint for adding joiner activity reservation ([9dabdf9](https://github.com/explore-siargao/es-main/commit/9dabdf90d9a992a17c8e5f3296fb727d6663e6fc)) ([a0d4241](https://github.com/explore-siargao/es-main/commit/a0d424177d543e7f0bdb6978a4548dfd53255dac)) ([820c59b](https://github.com/explore-siargao/es-main/commit/820c59b81ea3efad1d00dba04400ceca6da3b759)) ([2635395](https://github.com/explore-siargao/es-main/commit/26353954accbd68cc52be77a9053b9880aecf2c7))
- **api:** Added logic allowed days to cancel to rental cancel reservation endpoint ([8545947](https://github.com/explore-siargao/es-main/commit/854594788d510c3f212c226a903d2e454c9b295e))
- **api:** Modified keys on property, rental, activity, and reservation model from ids to qtyIds ([4a87946](https://github.com/explore-siargao/es-main/commit/4a87946f6e538ec4da90f0e53631425465d8cb82))
- **api:** Modified return of get joiner activities calendar ([02138e8](https://github.com/explore-siargao/es-main/commit/02138e8cf5f786fef24dd9442aa33456d704590c))
- Modified model activity and reservation ([52d606c](https://github.com/explore-siargao/es-main/commit/52d606c6e00638acf6f23a878a7bde09e3b40c28)) ([1109577](https://github.com/explore-siargao/es-main/commit/11095776bf1d72243554f7174a3f7cbed5f1ef4f))
- **web:** Corrected label on bedroom and living rooms when adding beds ([8badc78](https://github.com/explore-siargao/es-main/commit/8badc7860c1929d66cdc17f555c85d96385661ca))
- **web:** Fixed bed units not showing and undefined values on summary ([ecda560](https://github.com/explore-siargao/es-main/commit/ecda5605cbe2bc6a1b024904492b2664e09efb14))

### 🛠 Bug Fixes

- **api:** Fixed error on getting private activities with reservation ([c8504c7](https://github.com/explore-siargao/es-main/commit/c8504c729747e278633cf23a5a45b3065edf48b9))
- **api:** Fixed issue on not getting reservations on rental car and motorbike calendar ([4329ae6](https://github.com/explore-siargao/es-main/commit/4329ae6e2d4301e405641bf131f7de88fef3fb67))
- Type error for Private and Joiner ([bd6f607](https://github.com/explore-siargao/es-main/commit/bd6f6076b9532315025339e069ac926c40465412))
- **web:** Fixed error on filter date function not working ([0059d74](https://github.com/explore-siargao/es-main/commit/0059d742509469e063616db249d847fc2f39b50c))

### 🧰 Maintenance

- Minus 1 to daysPerPage for properties calendar ([30d44a7](https://github.com/explore-siargao/es-main/commit/30d44a7170637a7f01760a61644a542dfa92fd80))
- Rename abbr to name and change file name convention to kebab casing ([ea8a412](https://github.com/explore-siargao/es-main/commit/ea8a412ae053451baff1e3fae75fba486cc82895))

## [0.26.1](https://github.com/explore-siargao/es-main/compare/v0.26.0...v0.26.1) (2024-10-05)

### 🧰 Maintenance

- Added condition for saving activity pricing ([52b5e34](https://github.com/explore-siargao/es-main/commit/52b5e345eca9518b20de3e611137a2e66f4212b9))
- Cleanup for activity pricing to have consistent UI ([354b95a](https://github.com/explore-siargao/es-main/commit/354b95ac4c81046f926f031df6475dfb81c12005))

## [0.26.0](https://github.com/explore-siargao/es-main/compare/v0.25.0...v0.26.0) (2024-10-04)

### 🚀 Features

- after updating property locations sidebar location not turn to green ([28b0565](https://github.com/explore-siargao/es-main/commit/28b05657e0a854039794639ddbd1c3d7eafd994e))
- **api:** Activity add price per dates endpoint ([95b8bb6](https://github.com/explore-siargao/es-main/commit/95b8bb682c2d9d43db85f0a7ef12c15297c71f79))
- **api:** Added endpoint for cancelling rental reservation and getting activity counts ([dbe285a](https://github.com/explore-siargao/es-main/commit/dbe285a580d53d55fce9a543527e3a2a33e7b952))
- **api:** Added endpoint for edit and get slots price ([75ea753](https://github.com/explore-siargao/es-main/commit/75ea753dfd9aa863a72f5a91785d27db23968273))
- **api:** Added endpoint for get private and joiner activities ([ef0e7de](https://github.com/explore-siargao/es-main/commit/ef0e7def7a4d535d49dcb3da184d5779afc02adf))
- **api:** Create add activity calendar reservation ([dc764e9](https://github.com/explore-siargao/es-main/commit/dc764e95d08c5a06c4912dedeae6ff0211f548c2))
- **api:** Modified activity model schema added schedule and time slots ([515fee3](https://github.com/explore-siargao/es-main/commit/515fee3e20c6da89214f8d965a32acbbff41eea1), [fa87e57](https://github.com/explore-siargao/es-main/commit/fa87e57d0cec29a5f159dcb029a3fd928dcfd828))
- **api:** Modified affected endpoint functions due to modifying activity model ([42e2619](https://github.com/explore-siargao/es-main/commit/42e261967541fa66a3cbe435122aa82bf16aa650))
- Connect calendar activity reservation backend to frontend ([25d4164](https://github.com/explore-siargao/es-main/commit/25d4164b8981a80618fe04b51f7fad15a52db355), [1df4287](https://github.com/explore-siargao/es-main/commit/1df4287d7059cf5ea8d1b7270cbc143e44d15fef), [2d7e2ec](https://github.com/explore-siargao/es-main/commit/2d7e2ec22cbc8df3adcc945d01aeb6ec86f4c355), [2582dc6](https://github.com/explore-siargao/es-main/commit/2582dc6ac8174e721b86df18276bf7820b8e3583))
- Create pricing UI for activity setup ([5960846](https://github.com/explore-siargao/es-main/commit/59608462ef8429f8b923878d61a6081ab59c390d))
- **web:** Added cancel rental reservation function ([47be292](https://github.com/explore-siargao/es-main/commit/47be29232e258cc8de23d7fee0492a01b65e6fb8))

### 🛠 Bug Fixes

- fixed bug after saving property policies sidebar changing layout ([8914b2e](https://github.com/explore-siargao/es-main/commit/8914b2e74fde5c70b8ab0f606d6296a3e67d3ff9), [b73fc3c](https://github.com/explore-siargao/es-main/commit/b73fc3c7733b7a561f4e6f7036862836e99c7b18))
- **web:** Activity setup summary error on image UI ([37b42ce](https://github.com/explore-siargao/es-main/commit/37b42ce89ed580ca2cb38cb45e29f574ddff5581))

### 🧰 Maintenance

- Import not imported constants ([9557680](https://github.com/explore-siargao/es-main/commit/955768056f241da80aed7d75d5a0e08b83d6bbca))
- Updated read me setup of project ([5960707](https://github.com/explore-siargao/es-main/commit/5960707946513b975c92c9180245c899c51a98d0))

## [0.25.0](https://github.com/explore-siargao/es-main/compare/v0.24.0...v0.25.0) (2024-10-01)

### 🚀 Features

- Allow listing page for rental and property to be viewed publicly ([2717cef](https://github.com/explore-siargao/es-main/commit/2717cef84d13348d56ae497724c4d99b905a4b2e))
- **api:** Modified endpoint for updating price per dates in rental and properties ([f48d48b](https://github.com/explore-siargao/es-main/commit/f48d48bbf7c482f91bc1c8d50cc19fdb73a1008d))
- Removed not needed fields in edit price modal ([1b3e838](https://github.com/explore-siargao/es-main/commit/1b3e838da858c4a131cdca51909b4d4100ba6f83))
- **web:** Adjusted functions of adding price per dates in properties and rentals ([231400d](https://github.com/explore-siargao/es-main/commit/231400d3c95819adab528c33055206ea5e53a79f))
- **web:** Created reservation cancellation modal for all calendar types ([71b9b38](https://github.com/explore-siargao/es-main/commit/71b9b380bf8b14b157f42e65dd8f3dc4bb3c79d5), [8bbcda4](https://github.com/explore-siargao/es-main/commit/8bbcda4c7812c3350d983065a442b8233aa22e9c), [96d8d34](https://github.com/explore-siargao/es-main/commit/96d8d3439df1621b018e187b2e875fe614473bad))
- **web:** Modified rental and unit basic info added input number of cancellation days ([5dba085](https://github.com/explore-siargao/es-main/commit/5dba085c049d7b3903b1540160d2a62e03109b16), [d2eb814](https://github.com/explore-siargao/es-main/commit/d2eb814c8adc6925261129ed2003b0232f153e4c))

### 🧰 Maintenance

- Added else statement to all endpoint that have if statement on res.json ([0bb1d97](https://github.com/explore-siargao/es-main/commit/0bb1d970d958757bb94d39e108a0c3b0da846a9f), [bd6f677](https://github.com/explore-siargao/es-main/commit/bd6f677e0fc0d75bf09cc84cdd902fc3f87a8b80))
- Remove heroicons, return in endpoints and upgrade and clean all packages ([d78e2a5](https://github.com/explore-siargao/es-main/commit/d78e2a5dd1f05608823638abc02c54e203570939))

## [0.24.0](https://github.com/explore-siargao/es-main/compare/v0.23.0...v0.24.0) (2024-09-27)

### 🚀 Features

- Added reusable date format for timezone and included general Global Wrappers ([abb022d](https://github.com/explore-siargao/es-main/commit/abb022d0be9fd1d23ea99dd048ed680ba87dc0b5))
- **api:** Adjusted database model reservation units and rental ([e0a90e0](https://github.com/explore-siargao/es-main/commit/e0a90e00df12206cf2d144bcb754565fea5062dc))
- **api:** Modified activities model for activity type field ([5f2b44b](https://github.com/explore-siargao/es-main/commit/5f2b44bbc158f26bc68fa3076adb0c2a10c69330))
- Connect PricePerdates add modal of rental to backend ([7909f7c](https://github.com/explore-siargao/es-main/commit/7909f7c305b6a145e8cb6b710b8dbb130c695888))
- Rental Calendar search button function ([d3d9022](https://github.com/explore-siargao/es-main/commit/d3d9022dcafe3990fa28630584b541429ea1d559), [ead95fb](https://github.com/explore-siargao/es-main/commit/ead95fb4defca7fd27a9c1700854f38892ad4174))
- **web:** Added displays of price per dates on property calendar ([0b4b42a](https://github.com/explore-siargao/es-main/commit/0b4b42a940a87953ccf06a0aae129fce7ba4098c), [0dd3fac](https://github.com/explore-siargao/es-main/commit/0dd3fac821afc636636393751e4f0ec8ff41c88d))
- **web:** Added more height for image box in public listing page ([d9c5b36](https://github.com/explore-siargao/es-main/commit/d9c5b36aba2b4ba575e8b2dfc834bd04feae874c))
- **web:** Correct the alignment on left of blocksbars on calendar ([2e575d2](https://github.com/explore-siargao/es-main/commit/2e575d276bfce6a079b36b1965507683a4788bc1))
- **web:** Created text descriptions for no bookableunits in calendar ([8b5dcd9](https://github.com/explore-siargao/es-main/commit/8b5dcd91cb8e85e1eb8c03067a985d0b758095ab), [317e2d9](https://github.com/explore-siargao/es-main/commit/317e2d991d55ddb58f49a6ef5ccdb22ea01f571f))
- **web:** Display dynamic price on rental calendar ([31f725b](https://github.com/explore-siargao/es-main/commit/31f725b4399aca2795ce56ef885b9afee2907e14))
- **web:** Hide search button on calendar ([514b975](https://github.com/explore-siargao/es-main/commit/514b975db79e2454432a6f33717a1d5f4f939a33))
- **web:** Modified activity setup basic info ui ([deef355](https://github.com/explore-siargao/es-main/commit/deef35594af47eeabfd9303c24b6cc20dc782fc9), [339b4a4](https://github.com/explore-siargao/es-main/commit/339b4a4e71d71e67da00f2e082b1ec8884c92d13), [08c5609](https://github.com/explore-siargao/es-main/commit/08c560956f132e5ccbf0b89e86794fc1f97d0d21))
- **web:** Modify calendar side items property ui ([4c5ecde](https://github.com/explore-siargao/es-main/commit/4c5ecdef42094b861066372a9b70ef1660f7db00))

### 🛠 Bug Fixes

- **api:** Bug on adding reservation on property multiple display ([190dd42](https://github.com/explore-siargao/es-main/commit/190dd4267fa55176b9f0fbb9ed8e6572686c4982), [0d8917e](https://github.com/explore-siargao/es-main/commit/0d8917efff4e70166b3a0a836ed266656dc18681), [1498150](https://github.com/explore-siargao/es-main/commit/1498150d4ef48a20b05c771d1656c546a19dfeb1), [cb38070](https://github.com/explore-siargao/es-main/commit/cb38070157eb26a3cac166c194995a97ba674099))
- **api:** Error on dates on pricePerDates ([4891d42](https://github.com/explore-siargao/es-main/commit/4891d4206e7830ede494ae2259d8204f1d40fac2))
- Fix the not match dates of reservation blocks on the calendar dates ([79bb635](https://github.com/explore-siargao/es-main/commit/79bb635de8163f4922b8acb253832cdd81e029ee))

## [0.23.0](https://github.com/explore-siargao/es-main/compare/v0.22.0...v0.23.0) (2024-09-24)

### 🚀 Features

- **api:** Added endpoint for adding price per dates on units ([56ccc2f](https://github.com/explore-siargao/es-main/commit/56ccc2f4a182202d0dd5775c377f8fc6ce31a772))
- **api:** Added endpoint for adding rental price per date range and modified all get rental calendar categories ([a8dd71f](https://github.com/explore-siargao/es-main/commit/a8dd71fefa1c832068ffa0b3455a2023e0563b24), [489b829](https://github.com/explore-siargao/es-main/commit/489b82989b2f3ed5ded024eff89020f4a887935d))
- **api:** Modified activity model added experienceType field ([69b4d41](https://github.com/explore-siargao/es-main/commit/69b4d41798d510bbae7c5ab88f4a21d3f299b4a8))
- Change backgound color for hovering checkout, drop off and completed bar ([67f7536](https://github.com/explore-siargao/es-main/commit/67f7536f2c0a4a480922f8e1fbd7600711cc6b96))
- Rental cancelling calendar button not displaying the reservation blocks ([9bfa7ca](https://github.com/explore-siargao/es-main/commit/9bfa7ca1154a7dffaf51f94aa57927e6c262e792))
- **web:** Added today function on property calendar and add highlight for today date ([73e0c5b](https://github.com/explore-siargao/es-main/commit/73e0c5bfbc9109836dd49fc801b156ece95c5519))
- **web:** Added today function to activity calendar and add highlights to current day ([984f742](https://github.com/explore-siargao/es-main/commit/984f742b6f7203c1a256f68387130904f87d8c91))
- **web:** Added today functions to Rental car, motor and bike and add highlight for today ([6e6b0d0](https://github.com/explore-siargao/es-main/commit/6e6b0d0f6822be27e17e68a701798ba84617887f))
- **web:** Created calendar search modal ([c080996](https://github.com/explore-siargao/es-main/commit/c080996694505816e3befef2f373628c6c217003))
- **web:** Created edit price per days modal ([895f73b](https://github.com/explore-siargao/es-main/commit/895f73ba9801a12487e844deab2cbf7dad1651d2), [113e30e](https://github.com/explore-siargao/es-main/commit/113e30ecae55353f47ddae3c57072330a5f8ecfb), [3620b19](https://github.com/explore-siargao/es-main/commit/3620b191116c89c5f568b2558a72bd2e6385ca65), [8f0623a](https://github.com/explore-siargao/es-main/commit/8f0623a8a25b79c4c6059ee5d912b998dd378d0e), [d3d4b88](https://github.com/explore-siargao/es-main/commit/d3d4b88a7f50dd4fc5b3ae6bea4a01db575ce840), [7d52ab2](https://github.com/explore-siargao/es-main/commit/7d52ab270854b6dbf4c666e3f302f66b1444d184))
- **web:** Modified calandar legends colors ([adbb3fb](https://github.com/explore-siargao/es-main/commit/adbb3fbc224180a9c0e5bddfc9a65d0785ee3dc0))
- **web:** Removed the whole place modal in the process ([c69e228](https://github.com/explore-siargao/es-main/commit/c69e228d3ae4c8cfa0f3af912718c126a62e1727), [b29c858](https://github.com/explore-siargao/es-main/commit/b29c85820fd16443f2721dc01685ae82c860c46d))

### 🧰 Maintenance

- Modify pnpm lock yaml ([652851b](https://github.com/explore-siargao/es-main/commit/652851bddf628143f797911d7f17634a1ca9f50e))

## [0.22.0](https://github.com/explore-siargao/es-main/compare/v0.21.0...v0.22.0) (2024-09-20)

### 🚀 Features

- Add Activity Type input in activity basic info setup ([0478cd7](https://github.com/explore-siargao/es-main/commit/0478cd7571c66f31c19275dca5db06c9e8a68050))
- **api:** Added activityType field on activity model ([1466bb8](https://github.com/explore-siargao/es-main/commit/1466bb8d6cceac943b8e5bca1f6ddc7e8f796dde))
- **api:** Modified activities bookable units and rental models, added pricePerDates ([8c8538a](https://github.com/explore-siargao/es-main/commit/8c8538a4a31a6dc32ba4dfc47ff0bf8cf4abcfe0))
- Calendar UI correction ([b210e0a](https://github.com/explore-siargao/es-main/commit/b210e0aad76d67222e407928d80d06b4bd312d72))
- Modify the process of setup for property whole place ([40073f0](https://github.com/explore-siargao/es-main/commit/40073f0925dedbaf49ef15ac5eead693ef2b7fa1))
- **web:** Applied calendar current day and search date function to motor and bike ([53fb6c6](https://github.com/explore-siargao/es-main/commit/53fb6c638e5fcd9c38c8d02e4206f22271c54eed))
- **web:** Calendar counts available units automatic change depends on available units ([cf0345f](https://github.com/explore-siargao/es-main/commit/cf0345f30e44ce67af340acb8ccbe4ca1de9525c), [604a641](https://github.com/explore-siargao/es-main/commit/604a641c17697a1cb173c2a365c292628f29de86))
- **web:** Modified calendar legends ([f08b497](https://github.com/explore-siargao/es-main/commit/f08b497385453da04c27abb9a8a138cbea37cf21), [7c49837](https://github.com/explore-siargao/es-main/commit/7c49837ed5359c08f1f819ad0adb7dde364698a1), [3b1fedf](https://github.com/explore-siargao/es-main/commit/3b1fedf5cc45232678f17a11f243d53a47a059dd), [f4cab98](https://github.com/explore-siargao/es-main/commit/f4cab985108d23e464db43934102754dcfd646eb))

## [0.21.0](https://github.com/explore-siargao/es-main/compare/v0.20.1...v0.21.0) (2024-09-19)

### 🚀 Features

- Activity Calendar calendar button function ([ecc3e60](https://github.com/explore-siargao/es-main/commit/ecc3e60ec500ee773ecd1ce43c3dde3fcf456aff))
- **api:** Added automatic change of reservation status base by current date on property reservation and fixed some founded bug ([132dd55](https://github.com/explore-siargao/es-main/commit/132dd559bc872a0ddb355b00dd416c2c07f58329), [3b0bdcd](https://github.com/explore-siargao/es-main/commit/3b0bdcdef839eb286c8629be8ef02a7dde10d9c7))
- **api:** Added endpoint for editing unit reservation ([72722c0](https://github.com/explore-siargao/es-main/commit/72722c05ae1a41a765d49e986169a91b1ff131a3))
- **api:** Added endpoint for updating whole place type ([8331087](https://github.com/explore-siargao/es-main/commit/8331087cd5d9a120e85ec5ab2910646e10b55dd7))
- Property Calendar calendar button function ([4ad22e0](https://github.com/explore-siargao/es-main/commit/4ad22e049d97557630590bbdffbd9f42339a154b), [efbdc5e](https://github.com/explore-siargao/es-main/commit/efbdc5edd3bb8845f98f5d70d656a4874a695927), [8ec1d02](https://github.com/explore-siargao/es-main/commit/8ec1d0294f6e7ae29a5bc6919f8a3cf6f31c7b3d))
- Rental Calendar calendar button function ([54007d3](https://github.com/explore-siargao/es-main/commit/54007d35fcaffc5bde0113529c917da465a1ebce))
- **web:** Added Add and Edit Bike reservation modal ([d175f29](https://github.com/explore-siargao/es-main/commit/d175f29fa49d8d937306b68280a516171e74d3cf))
- **web:** Added Edit and Add Motorcycle reservation modal ([f7493a7](https://github.com/explore-siargao/es-main/commit/f7493a71f707997dae7f36de7995f7f779530830))
- **web:** Added optional label for notes and fix some bugs on notes ([8779d30](https://github.com/explore-siargao/es-main/commit/8779d302251342bba055627963098bb79c68a2bc))
- **web:** Added proper example place holder in each input ([a08dbee](https://github.com/explore-siargao/es-main/commit/a08dbee10cbf0d615ae80c2e20a463fc99dba113), [c49c8f6](https://github.com/explore-siargao/es-main/commit/c49c8f6e93c2d8a17e7be81ef0604308a617c5a3), [2b29fb2](https://github.com/explore-siargao/es-main/commit/2b29fb23de8e740465ada5bf56521a93968a5f8c))
- **web:** Adjusted the height of public property page images ([1e7bf58](https://github.com/explore-siargao/es-main/commit/1e7bf58362246a8fa7a4d930fdaa643ce1cac512), [fae10d1](https://github.com/explore-siargao/es-main/commit/fae10d119e39be5a53585f7474ca14106ea9eb41))
- **web:** Changed no description to add description in unit photo and change tags ([c233c28](https://github.com/explore-siargao/es-main/commit/c233c28977e8661fd151384aad9db8c20f22c39b))
- **web:** Maked the edit unit reservation function work ([46a9836](https://github.com/explore-siargao/es-main/commit/46a98364f86c334553ae1496e5ce09ae27bb5257))
- **web:** Mandatory property pricing ([d466a6b](https://github.com/explore-siargao/es-main/commit/d466a6b444b1a28214306744bcc08ab8267b9f97))
- **web:** Removed collapse button on all bookable category on calendar ([2aec0a6](https://github.com/explore-siargao/es-main/commit/2aec0a63c2746c15dabf04601c3f711df7bc67f2), [82c81fd](https://github.com/explore-siargao/es-main/commit/82c81fda3e029d4aaafce47cf916713f6d0f8cbb))
- **web:** Removed Table view button ([a03f2e6](https://github.com/explore-siargao/es-main/commit/a03f2e626b8e5c769d8a999247d7274c717299ff), [746444c](https://github.com/explore-siargao/es-main/commit/746444c4f5337d6c62ec8c04544a0b3cad0d10a4), [74e0371](https://github.com/explore-siargao/es-main/commit/74e0371712821e6a227c996d796027e3d8edc112))

### 🛠 Bug Fixes

- **bug:** unit saving even if no photos or no amenities checked ([7683d6b](https://github.com/explore-siargao/es-main/commit/7683d6b3dd2892f7c653afe40c97f9763bd54181))

### 🧰 Maintenance

- deleted deploy-home.yml and add deletion of docker containers and images ([650560f](https://github.com/explore-siargao/es-main/commit/650560f0bef8495eb09a9754c12695eaec9f4b62))
- revert docker compose ([87fab47](https://github.com/explore-siargao/es-main/commit/87fab475812bae886a526ccc7a83f1edf803f875))
- update docker command for es-sit environment ([5531d44](https://github.com/explore-siargao/es-main/commit/5531d444682c188e8a4ce44040b3ca611119942e), [58efa13](https://github.com/explore-siargao/es-main/commit/58efa13d150f6db3ec15764c022c9becf24da24f))

## [0.20.1](https://github.com/explore-siargao/es-main/compare/v0.20.0...v0.20.1) (2024-09-16)

### 🛠 Bug Fixes

- guides menu links to include "siargao" in the URL paths ([46b0df7](https://github.com/explore-siargao/es-main/commit/46b0df7a9b5f543079794b490a6099cf906c8756))

### 🧰 Maintenance

- update release-please.yml with changelog types ([264fbfd](https://github.com/explore-siargao/es-main/commit/264fbfd7ad900a1393ca62845f42af382a7a4d35), [eaebb65](https://github.com/explore-siargao/es-main/commit/eaebb65f80dd8753af65345209897119c1f9341d))

## [0.20.0](https://github.com/explore-siargao/es-main/compare/v0.19.0...v0.20.0) (2024-09-15)

### Features

- **api:** Added endpoint for editing unit child name in calendar ([a4a2ef1](https://github.com/explore-siargao/es-main/commit/a4a2ef16e44fb26791e0d21fa0b895f45123c7ab))
- **api:** Added get unit ids endpoint and modified get units calendar reservations ([ec1a5cd](https://github.com/explore-siargao/es-main/commit/ec1a5cd2cb2019e4ca06142b512e70712462ab6d))
- Changed the room name inputs same on whole place when adding beds and bathroom and amenities ([281ebc6](https://github.com/explore-siargao/es-main/commit/281ebc60b3a2e94c554f462cd46b23fba98e1202),[dde1a3e](https://github.com/explore-siargao/es-main/commit/dde1a3ecd90fa09911c2cdfd511615b265b977be),[138059f](https://github.com/explore-siargao/es-main/commit/138059f5d40d84610801de282bd672b77745dadb))
- Connect Add property reservation modal to backend ([0a6a844](https://github.com/explore-siargao/es-main/commit/0a6a8445cd6f726d105a514609896683f12bf1db))
- Create Add Activity reservation modal ([5890efd](https://github.com/explore-siargao/es-main/commit/5890efd59af20fd9d2465317e0dc167f56fd8efb),[79773a6](https://github.com/explore-siargao/es-main/commit/79773a68ba746393d9dade87df75ddfebc580f97))
- Modified inputs of room units ([bd7fe40](https://github.com/explore-siargao/es-main/commit/bd7fe405b0b110e74fa9b1bebd88ea1c073e1f0e))
- Show all data of property reservation on modal ([8970268](https://github.com/explore-siargao/es-main/commit/8970268b9f7c2266dc7a3a9b24dcb97f2ac96b03))
- **web:** Added functions for editing unit name in calendar property reservations ([7eeb279](https://github.com/explore-siargao/es-main/commit/7eeb2797312c74c33e87cd83157ebf9bb0b05aab))
- **web:** Changed the position of the title field in whole place setup ([09d1a1d](https://github.com/explore-siargao/es-main/commit/09d1a1dd22baa4f30cdbc128f7302c712f312423))
- **web:** Changed the position of title field in whole place unit ([cb9f535](https://github.com/explore-siargao/es-main/commit/cb9f535a00a15fbafbb353d435c47bf88599c6e9))
- **web:** Make the color of bars is correct by status on property calendar ([3e1c3ed](https://github.com/explore-siargao/es-main/commit/3e1c3ed1ba71c125e3f770ec212be3ccbfef6666))
- **web:** Modified label and design for inputs version 2 ([c8f2687](https://github.com/explore-siargao/es-main/commit/c8f2687dec52d6add307b920049fa9abd1ee9490))

## [0.19.0](https://github.com/explore-siargao/es-main/compare/v0.18.0...v0.19.0) (2024-09-12)

### Features

- Add Guest name to blocked dates on add reservation modal in rental calendar ([df332eb](https://github.com/explore-siargao/es-main/commit/df332eba8fc00ce7e1866e3d1db2e4b54d8dd64d))
- Add notes field for add reservation modal in rental calendar ([d7fb471](https://github.com/explore-siargao/es-main/commit/d7fb47146562cdea0ee715452ee6c63d9f187c32))
- **api:** Added endpoint for modifying rental reservation ([de46e26](https://github.com/explore-siargao/es-main/commit/de46e2600f9b92b11f063bb6cf1fe2e4aea66239))
- Connect Edit rental reservation modal to backend ([e230161](https://github.com/explore-siargao/es-main/commit/e2301618849a228444f6408d011f5763dab3dad6), [cb8b297](https://github.com/explore-siargao/es-main/commit/cb8b297e0d0d9c2d8bfe419e6ad346374939735d))
- Created Add Property reservation modal ([a184519](https://github.com/explore-siargao/es-main/commit/a184519024e03906b3eceab6514ba7929d1ab653))
- Removed Guest counts on add Reservation modal in rental reservation calendar ([4faa165](https://github.com/explore-siargao/es-main/commit/4faa165800da332584b06cce1f96b6839c9da57a), [5b67769](https://github.com/explore-siargao/es-main/commit/5b677695c82cc5220e1c57d785d8e8c4bb1c8792))
- Show all datas on reservation modal in rental reservation calendar ([ef91b0f](https://github.com/explore-siargao/es-main/commit/ef91b0fa3ea190d6d1937870f13a1a9c727a2a60))
- **web:** Added descriptive text to Property Facilities ([d7b4f62](https://github.com/explore-siargao/es-main/commit/d7b4f621a3d19f70309999f00c8f108b993352f9))
- **web:** Descriptions and tags for photos made mandatory ([f6415ab](https://github.com/explore-siargao/es-main/commit/f6415ab68d7486ede76b3faafeeec2f963e36a3f))
- **web:** Modified Locations setup for all categories ([08d8287](https://github.com/explore-siargao/es-main/commit/08d8287ad58f271bdf8b24492e27e37a0a8c0f26))
- **web:** Modified logic of whole place unit ([89dee78](https://github.com/explore-siargao/es-main/commit/89dee78946d8b6de83811172ee06da020d55a781), [cdaf548](https://github.com/explore-siargao/es-main/commit/cdaf5482124c334dbb8db4ff5bc421e365ec8783), [b2b4fbb](https://github.com/explore-siargao/es-main/commit/b2b4fbbeaca3f0eca0077d115d0cfe29b25a1dbe))
- **web:** Modified unit bed setup UI ([effb869](https://github.com/explore-siargao/es-main/commit/effb869339ac9d5b0f5b4909522cee7bd894b1f6))
- **web:** Modified visibility of preview listing button based on status ([51c7e9f](https://github.com/explore-siargao/es-main/commit/51c7e9fa121b97c98858cc04beac1ae37cd1bbb1))

### Bug Fixes

- Fix listing header setup and edit name ([c5564b5](https://github.com/explore-siargao/es-main/commit/c5564b5f2b9a843f6a04acd2a4b193b2ab313f99))
- Fix url setup and edit for property units ([c0f3ba9](https://github.com/explore-siargao/es-main/commit/c0f3ba9b0923fd2692624155a121457582f74aaf))

## [0.18.0](https://github.com/explore-siargao/es-main/compare/v0.17.0...v0.18.0) (2024-09-06)

### Features

- **web:** Added free text to all units basic info ([75a642e](https://github.com/explore-siargao/es-main/commit/75a642ebe3c481c0bb36967e408bf088e7656f6b))
- **web:** Added logic for displaying calendar bar colors base from reservation status ([4df6852](https://github.com/explore-siargao/es-main/commit/4df6852468bf42d8ca297324944314dd63dda05a))
- **web:** Added Modal for adding rental calendar reservation ([891aa08](https://github.com/explore-siargao/es-main/commit/891aa089d260c0eaf400c095a7cff79f237f7824))
- **api:** Added endpoint for adding rental reservations ([835b7a0](https://github.com/explore-siargao/es-main/commit/835b7a01e05618c9a42085c78d3d6d611deaad28))
- **web:** Connect Add Rental Reservation Modal frontend to backend ([b66c254](https://github.com/explore-siargao/es-main/commit/b66c2540c62fae0a9d1ac6bbcbb394fcfbf7ceee), [78f1922](https://github.com/explore-siargao/es-main/commit/78f19224ac496972148a29c009ffd32da868995a))
- **web:** Added custom hook for adding new rental reservation ([d5f880e](https://github.com/explore-siargao/es-main/commit/d5f880e8f3d8dda97a28f5047b3e6466bbb9691a))
- **web:** Changed url slugs ([e9867ca](https://github.com/explore-siargao/es-main/commit/e9867ca4805173d1601e5d125a600b6db95ed292))
- **web:** made adjustments for the unit types to be specific to the property ([b593e09](https://github.com/explore-siargao/es-main/commit/b593e09c805f061da0614d0b634113508ed7f41a), [b356bb8](https://github.com/explore-siargao/es-main/commit/b356bb81d270cf91f49950388af74e7cf8f194a4), [a38f998](https://github.com/explore-siargao/es-main/commit/a38f998b33cdb75cb7053d8d5f470693127549ca), [c8a8b43](https://github.com/explore-siargao/es-main/commit/c8a8b430caf0577738d6bb940fa82fb1616da283))
- **web:** Added add rental reservation function ([c81378d](https://github.com/explore-siargao/es-main/commit/c81378d8ccb46a6e52deea961adfe6ff62c92def), [21b1c42](https://github.com/explore-siargao/es-main/commit/21b1c42b3e023ae0330cad7e011d6b6c72fdf9f1))

### Bug Fixes

- **api:** Fixed allowing adding overlap dates in same rental reservation ([ce7599e](https://github.com/explore-siargao/es-main/commit/ce7599e73cde5a29b097b97278e2156c06f30d73))
- Saving of property unit price not displaying on UI ([dc8baa7](https://github.com/explore-siargao/es-main/commit/dc8baa7c53f837740cab467a67a76de1aece6ced))
- **web:** After login login button still showing ([6b01c2c](https://github.com/explore-siargao/es-main/commit/6b01c2c760319d8dbf40689a2add16d03c6a1bbd), [a173bbd](https://github.com/explore-siargao/es-main/commit/a173bbd34357008b35dedf4067db9ccf71cf780e), [7ef5f53](https://github.com/explore-siargao/es-main/commit/7ef5f535193eb571fd3dfcb05ac3cd41906b2150))
- **web:** Bug fix error not showing bar on previous dates ([2e47ddc](https://github.com/explore-siargao/es-main/commit/2e47ddc312eaa4de3c315e62ca8a178d87bc5c3b))

## [0.17.0](https://github.com/explore-siargao/es-main/compare/v0.16.0...v0.17.0) (2024-09-04)

### Features

- **api:** Added endpoint for getting all ids in rental ([4086102](https://github.com/explore-siargao/es-main/commit/4086102c798ef86a94cc50f59d607c59d305713f))
- **api:** Added endpoint for getting rentals names by host and category ([5e3725b](https://github.com/explore-siargao/es-main/commit/5e3725b2979c33eacd33b8332382c44f997eaed4), [eef20fe](https://github.com/explore-siargao/es-main/commit/eef20fe3d22f2141ad3e4c22604c60d22ddd0e16))
- **api:** Modified reservation db model ([8c9376a](https://github.com/explore-siargao/es-main/commit/8c9376a1e75134131a03edd8d7b7c66a86c58fe3))
- **web:** Added custom hooks for getting rentals by categories and vehicles by rental id ([b7245ea](https://github.com/explore-siargao/es-main/commit/b7245ea239d3a2ceb388916bbbcf24659a510347))
- **web:** Added expand legends text and dynamic hover in rental tabs ([e38c988](https://github.com/explore-siargao/es-main/commit/e38c988994a9cb5a04fedc27cbda2901011d78a1))
- **web:** Added new version of header with search bar ([fac80cc](https://github.com/explore-siargao/es-main/commit/fac80cca2ec0bd026f583aa9f78559dd7e08206f))
- **web:** Changed villa to whole place in property type selections ([13294c9](https://github.com/explore-siargao/es-main/commit/13294c9ba83de45dbebc8bf48f242958926ef1c1))
- **web:** Converted CMS pages fetch to server-side ([d8a17d9](https://github.com/explore-siargao/es-main/commit/d8a17d96d353c789f1c69406b5a0190524fd9340))
- **web:** Listing main public page UI cleanup (universal margin, photos rounded, lightbox display, not found error) ([ea8a968](https://github.com/explore-siargao/es-main/commit/ea8a968204eee3e207ffd66890bfbd9ac79414ee))
- **web:** Modified favicons colors of map ([6c20c47](https://github.com/explore-siargao/es-main/commit/6c20c47c0d047199b682af9c419df4bd7891b495))
- **web:** Modified listing setup locations ([8f309ce](https://github.com/explore-siargao/es-main/commit/8f309ce27047788be965bbf218b2e93544c47289))

### Bug Fixes

- **web:** Changed inputs border radius from md to xl ([8e69b2e](https://github.com/explore-siargao/es-main/commit/8e69b2e1ea89e1b18c7ba6f6e231174fe1737908))
- **web:** if no units do not show parent property in the list ([e22a828](https://github.com/explore-siargao/es-main/commit/e22a828f66b187862c98ea948ce4a5ff83abfed3), [6abae30](https://github.com/explore-siargao/es-main/commit/6abae304c3f21d2be51c1c0302a2791e9faf1aa5))

## [0.16.0](https://github.com/explore-siargao/es-main/compare/v0.15.0...v0.16.0) (2024-09-01)

### Features

- Make error boundary pages consistent to the theme ([a92330a](https://github.com/explore-siargao/es-main/commit/a92330accae0e322f1257328f92df8f8def3e054))

### Maintenance

- Made host listing header reusable for all category ([a92330a](https://github.com/explore-siargao/es-main/commit/6d69329bdfd9f99a46d89f19a3c0ae702adc94c9))
- Made Host Listing Sidebar reusable for all category ([a92330a](https://github.com/explore-siargao/es-main/commit/b4f09d63e6b1e1b725894d4d2e79ef1316e95ed1))
- Update URL for insights and change button radius ([a92330a](https://github.com/explore-siargao/es-main/commit/d2833d6c09f7b250833ef749c3dd9faf17989655))
- Make error boundary pages consistent to the theme ([a92330a](https://github.com/explore-siargao/es-main/commit/a92330accae0e322f1257328f92df8f8def3e054))
- Move links constants to index ([a92330a](https://github.com/explore-siargao/es-main/commit/efcc596eed179b3521e29a1730eef1e55987baac))
- Remove getCookie helper function ([a92330a](https://github.com/explore-siargao/es-main/commit/803908c2b50bb3df77844748771b56214d9704e8))
- Rename InputMaxLength to inputMaxLength for consistency ([a92330a](https://github.com/explore-siargao/es-main/commit/1ad70bd075ee6069006b20afd9da011815750ed8))
- Update loading component to use spinner animation ([a92330a](https://github.com/explore-siargao/es-main/commit/d2b3354dc0c3d7a7859e83d7b13bd4f64ee7609c))
- Update next.config.js to use API v1 instead of v2 ([a92330a](https://github.com/explore-siargao/es-main/commit/3c401e514f0bf86b0bc0898480ed25899b8ea172))
- Move api v2 to main (v1 api) for fe and be ([a92330a](https://github.com/explore-siargao/es-main/commit/0218ff638970fdcad8fb9317e082dd64ada1e7f2))

## [0.15.0](https://github.com/explore-siargao/es-main/compare/v0.14.0...v0.15.0) (2024-08-30)

### Features

- **web:** Added global error page/component ([cccbeef](https://github.com/explore-siargao/es-main/commit/cccbeef9fb7e5a5a8ba47050b5a2b19a54f82516))
- **web:** Added legends in property and rental calendar. ([206ad59](https://github.com/explore-siargao/es-main/commit/206ad599a8c61c40a9a1356561a7b0b6a77b74c7))
- **web:** adjusted listing units pagination to make the pagination work ([32fcb55](https://github.com/explore-siargao/es-main/commit/32fcb55c9203cdd22dc3bb68fed86916521f39a5))
- **web:** Changed border radius of inputs to standard (rounded-xl) ([92c2dbe](https://github.com/explore-siargao/es-main/commit/92c2dbeeadd3b92ae62f679be0a691f3d8b00ee9))
- **web:** Added legal page and its CMS (terms and use) ([75c87a5](https://github.com/explore-siargao/es-main/commit/75c87a53f89939361bf97ee881fd6a1a786c41a4))
- **web:** Created general blog page and its CMS. Added some improvements in some guides pages ([9cde2fc](https://github.com/explore-siargao/es-main/commit/9cde2fcd4ba236a807ba65a81cecd5fc80b3d902),[bd1617e](https://github.com/explore-siargao/es-main/commit/bd1617eac2423ed489786347f9ef0e8db22baf7d))
- **web:** Changed map marker icons based on there categories ([14b489c](https://github.com/explore-siargao/es-main/commit/14b489c1a684d88d8b1d8c65ea94e1a83039ea8c),[c4d0fba](https://github.com/explore-siargao/es-main/commit/c4d0fba8b1ef6235d5c494da2e7e705d675e011b),[6377e88](https://github.com/explore-siargao/es-main/commit/6377e8856f2473e43e63424a9552e790f2b2d378),[5caed67](https://github.com/explore-siargao/es-main/commit/5caed676d138aaa671ba8f697d362aa5c29fa313))

### Bug Fixes

- Remove unused npm package, update dependencies and fix mongo mapping ([d7adae9](https://github.com/explore-siargao/es-main/commit/d7adae950101dfe2804c0aeeb2b24e0362582d4c))
- **web:** Fixed lightbox bottom image height ([96bfa32](https://github.com/explore-siargao/es-main/commit/96bfa32f19f270908afa67672518d4e90ee8254e))

## [0.14.0](https://github.com/explore-siargao/es-main/compare/v0.13.0...v0.14.0) (2024-08-29)

### Features

- **web:** Added divider on user dropdown menu on header ([fa12a2e](https://github.com/explore-siargao/es-main/commit/fa12a2ea701646e37d882a067e3d8632d731c6c0))
- **web:** Added legends for reservation calendar ([f2e1678](https://github.com/explore-siargao/es-main/commit/f2e16781a24fa39c539282e99fdcff3f79641342))
- **web:** Changed calendar rentals tab into dynamic ([a300181](https://github.com/explore-siargao/es-main/commit/a30018120741ea42971c41b4ef1f141c5810cc5c),[1ec2500](https://github.com/explore-siargao/es-main/commit/1ec2500657f2a392b9c40a3d48007831337e743d),[dd5e145](https://github.com/explore-siargao/es-main/commit/dd5e14526bb8d435fc407436ba517186d138bde3))

## [0.13.0](https://github.com/explore-siargao/es-main/compare/v0.12.0...v0.13.0) (2024-08-25)

### Features

- **web:** Update header and search bar widths in blog guide and listings layouts ([b63b36f](https://github.com/explore-siargao/es-main/commit/b63b36f6298d8d23c9ce22ef98ae8a3e345a811d))

### Bug Fixes

- Remove unused "url" field in Media collection configuration and update ImageGallery component to handle image filenames ([5e454fc](https://github.com/explore-siargao/es-main/commit/5e454fc2f9e5b78bdf96aa6e5db0a0d7c6731b7a))
- **web:** Fixed fetch issue. Changed localhost URL to WEB_URL ([90b2a04](https://github.com/explore-siargao/es-main/commit/90b2a045364a9b5009f0c715953e07a22d0a3493))

### Maintenance

- Fix type errors for headless ui by removing overlay ([a0ecb85](https://github.com/explore-siargao/es-main/commit/a0ecb8520b3876eb35ef1fe0c8d08aa5760c28d8))
- Major UI cleanup ([f09183b](https://github.com/explore-siargao/es-main/commit/f09183bf66d12aba12dd1d0e635f496ac46278e5))
- Update header and search bar widths in blog guide and listings layouts ([a4bd77e](https://github.com/explore-siargao/es-main/commit/a4bd77e26f853a2739c0811b0ddd9a9d53ea5896))

## [0.12.0](https://github.com/explore-siargao/es-main/compare/v0.11.0...v0.12.0) (2024-08-23)

### Features

- **api:** Added endpoint for get calendar reservations for beds ([4966e0a](https://github.com/explore-siargao/es-main/commit/4966e0a63b80944129afe82b22a663faf7c68e73))
- **api:** create endpoint for calendar unit whole place reservations ([86fee15](https://github.com/explore-siargao/es-main/commit/86fee15ea167e229b0e6724d6288f1ebdc4c0198))
- Update local database setup instructions and remove test message ([8eb9125](https://github.com/explore-siargao/es-main/commit/8eb91256b1e02459069fe209c8d72c83b971924a))
- **web:** Added calendar reservation room view connected to backend ([e72024c](https://github.com/explore-siargao/es-main/commit/e72024c61f06536a5540e5313b895e6382d098dd))
- **web:** Added custom hook for get calendar bed reservations ([73e1988](https://github.com/explore-siargao/es-main/commit/73e1988dfbd34ba7213429bacdda66b8c2b372b9))
- **web:** Added search bar for guide pages ([be9ed89](https://github.com/explore-siargao/es-main/commit/be9ed898727aca6793b06c0ed251ab06d348a991), [f619220](https://github.com/explore-siargao/es-main/commit/f619220b7eb143f2b21c880b7569c62bce819690), [e15ea97](https://github.com/explore-siargao/es-main/commit/e15ea97ff2799730054505748bee6307e429cc32), [527df47](https://github.com/explore-siargao/es-main/commit/527df479e6a96631e091780b8a65d6542e89e271))
- **web:** Connected calendar unit whole place reservation backend to frontend ([cb44a5a](https://github.com/explore-siargao/es-main/commit/cb44a5a284988f2a016a6554016176063be780a3))
- **web:** Connected calendar reservation beds frontend to backend ([edde414](https://github.com/explore-siargao/es-main/commit/edde414391fd630bfdd8cee5098755a1c684cd6d))
- **web:** Connected calendar whole place reservation backend to frontend ([a6b83d2](https://github.com/explore-siargao/es-main/commit/a6b83d2d0befb2991795ed1dbf4d88811f9e837a))
- **web:** Created custom hooks for get calendar unit whole place reservations ([54c3fba](https://github.com/explore-siargao/es-main/commit/54c3fbae41e54a08284284133af483fc4e2634a7))
- **web:** Created calendar tabs for each category of the page ([203c34a](https://github.com/explore-siargao/es-main/commit/203c34a12add6278920953d0d08856d5536be512), [2bfc6b1](https://github.com/explore-siargao/es-main/commit/2bfc6b1d078ea6bdffceb100f8721ec8258efcdc))
- **web:** Improved whole place units ([46569f1](https://github.com/explore-siargao/es-main/commit/46569f1bb90bba24641c57e330c70aef03896e60), [f564b1c](https://github.com/explore-siargao/es-main/commit/f564b1c6016372df0093219bc6adac49577df866))
- **web:** make the listbox square shape ([f7ac6e9](https://github.com/explore-siargao/es-main/commit/f7ac6e97525aeb70ae7c28f264e8bbcac25f6ccc))

### Bug Fixes

- **api:** savings of emergency contact not working ([78deff6](https://github.com/explore-siargao/es-main/commit/78deff6f799c161943db42975af38c8b78db0d87), [c90c231](https://github.com/explore-siargao/es-main/commit/c90c231b1f90f276aeb5e5c20597630bea7c2093))

## [0.11.0](https://github.com/explore-siargao/es-main/compare/v0.10.0...v0.11.0) (2024-08-21)

### Features

- Added S3 as file storage for PayloadCMS ([943d766](https://github.com/explore-siargao/es-main/commit/943d766c1f5146c719d865a06238908a1d715b05))
- Update cms Dockerfile and compose files to include AWS credentials in environment variables ([2ad4b00](<https://github.com/explore-siargao/es-main/commit/943d766c1f5146c719d865a06238908a1d715b05](https://github.com/explore-siargao/es-main/commit/2ad4b002879af9383ada2354b795840970f889ef)>))

## [0.10.0](https://github.com/explore-siargao/es-main/compare/v0.9.0...v0.10.0) (2024-08-20)

### Features

- Add cms folder in apps for Payload CMS integration([d10afcd](https://github.com/explore-siargao/es-main/commit/d10afcd2416869cb8f319e212fe05cc518767dae))
- **web:** Re-setup new empty CMS ([555279e](https://github.com/explore-siargao/es-main/commit/555279ea00f3faa29da81aa39443ca604018f7b0))

## [0.9.0](https://github.com/explore-siargao/es-main/compare/v0.8.0...v0.9.0) (2024-08-20)

### Features

- **web:** Added earnings bar graphs with some filters ([fe60831](https://github.com/explore-siargao/es-main/commit/fe6083186158b633b405f838cf12a2a942fee12a), [f8df0dd](https://github.com/explore-siargao/es-main/commit/cbf5b50227917d19b4fed2a4f1ced4e8d34b8e8c))

### Bug Fixes

- **web:** Fixed error on creating new property ([2664cc1](https://github.com/explore-siargao/es-main/commit/2664cc15a85edeb07d134a7020c4a1339953de64))

## [0.8.0](https://github.com/explore-siargao/es-main/compare/v0.7.0...v0.8.0) (2024-08-16)

### Features

- Added backend car calendar reservation endpoint ([d1c84ab](https://github.com/explore-siargao/es-main/commit/d1c84ab276dbc208dd02b5ecc17e49d1318b0459))
- **web:** Added Connected car calendar reservationfrontend to backend ([d3ce744](https://github.com/explore-siargao/es-main/commit/d3ce7440fdf45bc06ffe0ef57d4654adcbb4165e))
- **web:** Added custom hook for getting cars calendar reservation ([806cbe8](https://github.com/explore-siargao/es-main/commit/806cbe8ea066faa27241c0da7373eb5d12b6c0e5))
- **web:** Added custom hooks for getting bike calendar reservation ([6262897](https://github.com/explore-siargao/es-main/commit/6262897b326ecc63008fd4fd0d35f4421a796909))
- **web:** Added dynamic returns of some categories and types of filter ([8e412ac](https://github.com/explore-siargao/es-main/commit/8e412acc99e895984b638282cadeefce01effb5b))
- **web:** Added image gallery border radius and blog guide header margin ([cb14bd4](https://github.com/explore-siargao/es-main/commit/cb14bd42296cde1a347e97ffb5f4a5c8651a3b83))
- **web:** Added rich text serializer ([9d6dba4](https://github.com/explore-siargao/es-main/commit/9d6dba4384c79b1085971134a54945753f8ab406))
- **web:** Implemented backend get calendar rentals bike to frontendend ([3a4e88c](https://github.com/explore-siargao/es-main/commit/3a4e88c206ce47732ae2ce88fe2b6d2d2539f5a3))
- **web:** Improved second page UI ([008e1e8](https://github.com/explore-siargao/es-main/commit/008e1e8cf8f6636f8d3251a342d255eee5402141))
- **web:** landing page improvements ([d7981d5](https://github.com/explore-siargao/es-main/commit/d7981d56e0544aacd65712b17a97534618a5aeb3))
- **web:** lightbox image gallery ([06a1324](https://github.com/explore-siargao/es-main/commit/06a132487aa757d90ab2d843410972159ad0f143), [1df8548](https://github.com/explore-siargao/es-main/commit/1df8548673ccd2142fef8041ff249bf4737331ec))
- **web:** Some adjustments in user interface ([0d75177](https://github.com/explore-siargao/es-main/commit/0d75177b03216503496a34f6ca3539a605e2f544))
- **web:** UI clean ups ([74c4bb1](https://github.com/explore-siargao/es-main/commit/74c4bb14cd472ac2c7f985fd3f011e5462a8d4a4))

### Bug Fixes

- **web:** Try fix issues 1 ([09d069e](https://github.com/explore-siargao/es-main/commit/09d069e94e9023b0a5ad9fcec6ab3d4744ea06ab))

## [0.7.0](https://github.com/explore-siargao/es-main/compare/v0.6.0...v0.7.0) (2024-08-13)

### Features

- Add qty to rentals motorcycle and bikes UI and backend ([21345d6](https://github.com/explore-siargao/es-main/commit/21345d61e1394a74bfd1d0acb9fd7656b26931b6))
- Added quantity to shared room ([dd232ed](https://github.com/explore-siargao/es-main/commit/dd232ed6fafa6061444a4cbef99df2819b86aa06))
- **api:** Added api endpoint for getting rental bike calendar view ([da058d8](https://github.com/explore-siargao/es-main/commit/da058d82b7b28e6fb382841d99787c4c54b54041))
- **api:** Added endpoint for calendar rental motorcycle ([c7c56cf](https://github.com/explore-siargao/es-main/commit/c7c56cf111f5595526fa2a185008692a0da57368))
- Fix error on saving editing segments ([ed94a59](https://github.com/explore-siargao/es-main/commit/ed94a59abe17f20890a3dc0830ce92dd83a4c746))
- Implemented calendar rental motor backend to frontend ([006885c](https://github.com/explore-siargao/es-main/commit/006885c620bc5fa520cf095cba80df2afc8c56ab))
- Implemented calendar reservation for motorcycle in frontend ([bfef151](https://github.com/explore-siargao/es-main/commit/bfef151a7c81cda2b39ce6b43429be96d4eb8807))
- make the guide map square ([9ba4f7c](https://github.com/explore-siargao/es-main/commit/9ba4f7c8939413f5cff381e09ba02e9bbd4c7453))
- Modify Add shared space/beds page ui ([509100d](https://github.com/explore-siargao/es-main/commit/509100d395e73f6e095ba7b85474d56122638731), [a83586f](https://github.com/explore-siargao/es-main/commit/a83586f28d4e1b685df36f5a1530d621b8742bed), [54393c8](https://github.com/explore-siargao/es-main/commit/54393c8a2a8ba728d6076856c0a489c1e05da3a0))
- modify add whole place page ui ([9396d22](https://github.com/explore-siargao/es-main/commit/9396d22d853bd5d2577b4ed681f71ed1b94ed784), [3cda416](https://github.com/explore-siargao/es-main/commit/3cda41671542f96c7b8cdef08a71199072835445), [b5c9eca](https://github.com/explore-siargao/es-main/commit/b5c9ecae307373f73d6e03365736513c51105d83), [cc24dbc](https://github.com/explore-siargao/es-main/commit/cc24dbc927318d95242264366a068554df9a4335),[c16d754](https://github.com/explore-siargao/es-main/commit/c16d7545cf972494d7b37e0a8c34bc1def0fbc1b),[718c8b5](https://github.com/explore-siargao/es-main/commit/718c8b5dbbb92ae6a312b897b62bf1e0154a2bc9), [69be941](https://github.com/explore-siargao/es-main/commit/69be941ba2528a8bd59027cf5eff2bf352780ee8), [8fcf8c3](https://github.com/explore-siargao/es-main/commit/8fcf8c3e6be9a7293cac21c6933eaa52460fc521), [4433335](https://github.com/explore-siargao/es-main/commit/4433335a40a7cad51059cee3a6ce3edd1a548931), [44ce96d](https://github.com/explore-siargao/es-main/commit/44ce96d00c82f5dffe746afcc19cd3bd55a4b6f0))
- on studio type unit you cant add room more than one ([f64bebd](https://github.com/explore-siargao/es-main/commit/f64bebdfaa54d968b20e73e4790afc0fe2767c6f), [236c4ff](https://github.com/explore-siargao/es-main/commit/236c4ff8f2d89e8d25a6312afaafaebc2d1ad222))
- **web:** Added filter to earnings ([77a0079](https://github.com/explore-siargao/es-main/commit/77a0079416f09e76453f059983b1ae16197514b9), [3a427bd](https://github.com/explore-siargao/es-main/commit/3a427bdb4bbe0f10eee4de4a4aab0f481ef423ec))
- **web:** Added getting to know island page ([6a32e69](https://github.com/explore-siargao/es-main/commit/6a32e697644f375141374fd0a195f79a61f6c4cb))
- **web:** Added hero section in travel style page and some adjustments in the Client Hero Section ([7d8623b](https://github.com/explore-siargao/es-main/commit/7d8623b7ba28ad76f0fd8eca63c3aa8e841c3f78))
- **web:** Added level and cuisine to popup on guide map ([e4101bb](https://github.com/explore-siargao/es-main/commit/e4101bb3268e033f4a8ae668360e3b2e40f6a0c4))
- **web:** Added re-usable checkbox filter user interface component ([5218bf5](https://github.com/explore-siargao/es-main/commit/5218bf542698cec68052d7ccee1da2d0788c798b))
- **web:** Added re-usable numeric filter components with zustand ([67fa292](https://github.com/explore-siargao/es-main/commit/67fa2926813a34122009dc2c6211b8dd2caf0068))
- **web:** Added restaurant, cafe, bars pages and some changes in user interfaces ([b6b25a9](https://github.com/explore-siargao/es-main/commit/b6b25a9b10391e9e5c482a277625eb8182599a43))
- **web:** Added show all photos in unit images section in property public single view ([0cc1363](https://github.com/explore-siargao/es-main/commit/0cc1363b9a392e5d23aad3a2683b62d8665f0b59), [837faad](https://github.com/explore-siargao/es-main/commit/837faadd9512efa3b1eca1169c18bd1b9e2e78b6), [5fcafb3](https://github.com/explore-siargao/es-main/commit/5fcafb3b88b0db648aa68db56eea0b651787dd76))
- **web:** Added travel style page ([d05607a](https://github.com/explore-siargao/es-main/commit/d05607a52152d4f5d9d6044c34027cbb0581982b))
- **web:** Added user interface for surfing guide page ([aaabcda](https://github.com/explore-siargao/es-main/commit/aaabcdabc8bd62ab280d399a03ff90381e17840b))
- **web:** Added zustand for checkbox filter ([ab7a76d](https://github.com/explore-siargao/es-main/commit/ab7a76d2a6645566e0cbbcec6301803a4d710d1f))
- **web:** Change link and url behaviour of SliderItem ([82324cd](https://github.com/explore-siargao/es-main/commit/82324cd013e3146afa2b065c5eb082beec934f2d), [379f4bf](https://github.com/explore-siargao/es-main/commit/379f4bff183f3493b961c5cc14864ab5380ca1d2))
- **web:** change the bar graph of payment history to month by month ([00081a6](https://github.com/explore-siargao/es-main/commit/00081a6a973613a069068e70f0e1a44017f864e8), [8b8f087](https://github.com/explore-siargao/es-main/commit/8b8f0872139449267c0267381385d211f265cf8c), [1b14b9e](https://github.com/explore-siargao/es-main/commit/1b14b9eaf891bafcb36498b33380b09800314fdc))
- **web:** change url of restaurant and surf guide ([3d5b0d6](https://github.com/explore-siargao/es-main/commit/3d5b0d640cc2cc6cd3d8493980e5741bb0c4fb9d))
- **web:** Connect main landing page to second page ([757772e](https://github.com/explore-siargao/es-main/commit/757772e1b1f20054cf9fb3668fcf40b7df56ae31), [6ed20e0](https://github.com/explore-siargao/es-main/commit/6ed20e08d18a1adeb40705f43e6f7ea2aed2b183))
- **web:** Connected guide pages to landing page ([fa65172](https://github.com/explore-siargao/es-main/commit/fa65172432c70db4edf20ad4d62d050f0b73b3f6))
- **web:** Create custom components for essential travel information ([189c43a](https://github.com/explore-siargao/es-main/commit/189c43ab50a894c933f074ab3236749b4a07b291), [58758a1](https://github.com/explore-siargao/es-main/commit/58758a1f5d162f23740c8fdd12a8d388c80f3fee), [66377fc](https://github.com/explore-siargao/es-main/commit/66377fc7ea939ef4f09ea7ee45c41914eb257d83))
- **web:** Create dynamic second level page ([83cd2d4](https://github.com/explore-siargao/es-main/commit/83cd2d49861c3c5094a827c7dead03351782af5c))
- **web:** Create reusable component for the filter result ([64dc96f](https://github.com/explore-siargao/es-main/commit/64dc96fb2bbb6875e323f4b4bf70e9f54c244a3d), [4559aeb](https://github.com/explore-siargao/es-main/commit/4559aeb99ddc3d1d01381bb4f0c034260333eee1))
- **web:** Create reusable minimap search ui ([2e8ee3f](https://github.com/explore-siargao/es-main/commit/2e8ee3f09e268abd259e5fedf543401501f7b1e2))
- **web:** Create side filter reusable component ([e5d4bd6](https://github.com/explore-siargao/es-main/commit/e5d4bd6a53d6649b8bdb0ea69dc19e011ab39ea5))
- **web:** Created adjustable filter component ([d85c480](https://github.com/explore-siargao/es-main/commit/d85c4807151ce475be463e0a04d57ead2a472d0d), [8476a8d](https://github.com/explore-siargao/es-main/commit/8476a8d05b2343368e5fc0954f738cbd5443751d), [fe4c5dd](https://github.com/explore-siargao/es-main/commit/fe4c5dd790045fb4ad593962c246739444db2843))
- **web:** Created component for bottom part of home page ([f4f56df](https://github.com/explore-siargao/es-main/commit/f4f56df2b9d23f9dd1dcbf8882875b267620ccef), [462cd65](https://github.com/explore-siargao/es-main/commit/462cd6529395f28cd7046597a4a1e326e5390459), [00e66ad](https://github.com/explore-siargao/es-main/commit/00e66ad91a2f71168f5d0ab686710fa959122663), [8d7f222](https://github.com/explore-siargao/es-main/commit/8d7f2221a6fe157cd1a9deb0e770d63dd257fc9c))
- **web:** Created component for browse property types cards list ([99a39cc](https://github.com/explore-siargao/es-main/commit/99a39cc666ca59ab8a0517be93b799ab28e86802), [deb9ee8](https://github.com/explore-siargao/es-main/commit/deb9ee886b38abee449468fe61d85678b5f8aa99), [7171344](https://github.com/explore-siargao/es-main/commit/717134400f15ed65f6f200d729a3f273af4b63d7), [f34a0be](https://github.com/explore-siargao/es-main/commit/f34a0be683be4eae71e7588cd82731b6a31a8d6c))
- **web:** Created new landing page UI ([911c8a3](https://github.com/explore-siargao/es-main/commit/911c8a3188009ceebfc3cc7f082a9528438938e7), [234d602](https://github.com/explore-siargao/es-main/commit/234d6020d90496f3082108083dc776f7c9c8fe87))
- **web:** Created reusable slider item component and completed home page ui ([71dc8ae](https://github.com/explore-siargao/es-main/commit/71dc8ae96f0937d346a9dccbe3f27ee5ffa8024f))
- **web:** Explore siargao islands page ([aca5ec8](https://github.com/explore-siargao/es-main/commit/aca5ec883076edb7a1473485e7286e62a6495e72), [0f88d40](https://github.com/explore-siargao/es-main/commit/0f88d4089083845e4aadb59dfa07559740475b81))
- **web:** Integrated Payload CMS for surfing ([84fa84d](https://github.com/explore-siargao/es-main/commit/84fa84da8030ba20b4348ecb1341b54c04c76bf5))
- **web:** Modified slider to accept how many items will display ([ba3841c](https://github.com/explore-siargao/es-main/commit/ba3841ca1f7615d930d4abf175a65487b623c99c), [af0e89b](https://github.com/explore-siargao/es-main/commit/af0e89b057495c1dba7fe74626bb2373b503b06a))
- **web:** Modify Create property unit modal ([f22f2db](https://github.com/explore-siargao/es-main/commit/f22f2db6b2c8a3626f1bd4736aedc6187c276135))
- **web:** on studio type unit you cant add room more than one ([e4099ae](https://github.com/explore-siargao/es-main/commit/e4099ae4761dfced2a20f4eded7d3700f530abfb))
- **web:** put image name etc when hover on pin in guide map ([9eb67e7](https://github.com/explore-siargao/es-main/commit/9eb67e7e0e03340b08ea7e4c123e75dddb40fae7), [9eb67e7](https://github.com/explore-siargao/es-main/commit/9eb67e7e0e03340b08ea7e4c123e75dddb40fae7))
- **web:** Removed description to units list ([8ff832d](https://github.com/explore-siargao/es-main/commit/8ff832dde3ded9685bd2967c3358123e873d7660))
- **web:** Rental Search pick up and drop date ([3fbf1a6](https://github.com/explore-siargao/es-main/commit/3fbf1a6f02f111bc4cadd2f38679c8be7bc7a395))
- **web:** Revamped search section for landing page ([fe34dca](https://github.com/explore-siargao/es-main/commit/fe34dca37ccaa40f9725ab05efdc3a704fbbcdb9))

### Bug Fixes

- approvals pagination ([9f51486](https://github.com/explore-siargao/es-main/commit/9f514861e2e5f8431bbe89bd26fcd123fd71dc3a))
- Fixed error on Activity Box UI ([ddb8f3b](https://github.com/explore-siargao/es-main/commit/ddb8f3bd8bcec03a2ee12458d773e138ba9d2e96), [7dc7306](https://github.com/explore-siargao/es-main/commit/7dc7306ea45c320a2713136eedd6e920adee9a93), [20c2086](https://github.com/explore-siargao/es-main/commit/20c20866ea0463c1cf6803ae7e9dcfc1f4a319e3))
- **web:** Fixed drop down selectable even hidden ([45ca521](https://github.com/explore-siargao/es-main/commit/45ca521541d3a722787f36ab9785767684e966b0))
- **web:** Fixed type issue in checkbox filter component (just added [@ts-ignore](https://github.com/ts-ignore)) ([f291165](https://github.com/explore-siargao/es-main/commit/f29116525e71c48a45ae9253423b0faceaa37861))
- **web:** Try fix 1 issue in sonar ([ac590a6](https://github.com/explore-siargao/es-main/commit/ac590a6e16eddb6342f9c74d7382377bd14f11ec))
- **web:** Try fix 4 issues in sonar ([87b6dd1](https://github.com/explore-siargao/es-main/commit/87b6dd1e80f7b55f2f4376d711b056569f27690a))

## [0.6.0](https://github.com/explore-siargao/es-main/compare/v0.5.0...v0.6.0) (2024-07-21)

### Features

- add descriptions under create listings inputs ([f17ff5e](https://github.com/explore-siargao/es-main/commit/f17ff5e2c1371f035dc78d9f87ea6b8428bb840c))
- add reservation modal ([ffa266c](https://github.com/explore-siargao/es-main/commit/ffa266c7ced292896f1d99f1f46a3756827d0c3c), [bd3d48f](https://github.com/explore-siargao/es-main/commit/bd3d48f1dbdf355f42189ec82819ea38a51c335b))
- **api:** Created updated activity price and slots endpoint ([fae0097](https://github.com/explore-siargao/es-main/commit/fae00971900df3fbc4e33fc4c991633c39f15ab7), [7db0234](https://github.com/explore-siargao/es-main/commit/7db0234ebbe4ddc6a9a5d67099094b666abb22fd))
- **api:** Include adding of slots and price in add blank activity endpoint ([ee8d64f](https://github.com/explore-siargao/es-main/commit/ee8d64f59c977f701adc399c535a7334086b729a), [d8af847](https://github.com/explore-siargao/es-main/commit/d8af84733463fd92418f321d414d4c457028b763))
- **api:** Include slots and price in get activity by id endpoint ([efb4e36](https://github.com/explore-siargao/es-main/commit/efb4e3675484bf3c33c2b7ad1fad6e5b9e0c6477), [fcf75db](https://github.com/explore-siargao/es-main/commit/fcf75dbe1f9646834ae7d9f2d728035ccac20806))
- **api:** Modified activities schema ([18ba944](https://github.com/explore-siargao/es-main/commit/18ba944c2c0dd217894a3bb915132e2e0c6e5f34), [5c31617](https://github.com/explore-siargao/es-main/commit/5c31617cebd976a924e30d7971c3e0eae881989e))
- **api:** Modify add and update whole place endpoint ([dcca75d](https://github.com/explore-siargao/es-main/commit/dcca75dda65f343c24f5ce701ddb15d2a45d50de))
- **api:** Modify bookableUnitType Schema ([6925364](https://github.com/explore-siargao/es-main/commit/69253641da83637fdc77ca452b1f14a25d001233))
- Connect public listing activity single view to backend ([ebb91a5](https://github.com/explore-siargao/es-main/commit/ebb91a53990cebe77d428d3bf52da833836c90d9))
- Create custom hook for update activity pricing and slots ([36c630e](https://github.com/explore-siargao/es-main/commit/36c630ec5b1d3552f19c548f4ff730a6944e4c1c), [f18633f](https://github.com/explore-siargao/es-main/commit/f18633fd20361916f4929ee3d871564df18668b1))
- implement add reservation for rental and activity ([7819a3f](https://github.com/explore-siargao/es-main/commit/7819a3fb789830b239534a641ffd939f6a89ba4b))
- Implemented custom input in room unit ([dc0920f](https://github.com/explore-siargao/es-main/commit/dc0920f9186210e4b5f39d50c672348a8c170a6c))
- property units pricing ([f4dcbe1](https://github.com/explore-siargao/es-main/commit/f4dcbe17c1516b6c118a7171ffaa11baa3a666a0), [bfdc6a5](https://github.com/explore-siargao/es-main/commit/bfdc6a5e2c247515ab54644c2cb60ed8bfd8a843), [0a66d0b](https://github.com/explore-siargao/es-main/commit/0a66d0bcc73a27f483cc69bff6fa43bd3e7f0619), [aaf79c0](https://github.com/explore-siargao/es-main/commit/aaf79c0b86a5f0b2288ba806ac16f9b786ac8536))
- Removed Rental details minimum age and put driver license required ([c41707d](https://github.com/explore-siargao/es-main/commit/c41707dbbefde7ec5fd988c69db8cf2a73aee945))
- Rental Addons in others enter new fields ([97fbc41](https://github.com/explore-siargao/es-main/commit/97fbc41eacc1fa412acd8bc050d956c54dd12818), [6ae63eb](https://github.com/explore-siargao/es-main/commit/6ae63eb73b102d8ccf8115f402c47c3ee5ae0cc8))
- searchbar for landing page ([9292620](https://github.com/explore-siargao/es-main/commit/9292620931215354ba8792f4cfbd63ea141e7431))
- **web:** add descriptions on insights ([56c7150](https://github.com/explore-siargao/es-main/commit/56c71506fe74f8e802e6e91b6403810ce2fa5e88))
- **web:** Add example rental photos description and tags ([fbb590a](https://github.com/explore-siargao/es-main/commit/fbb590a83ccafe28c191a2bff74175ce6c3974e0))
- **web:** Add Margin 8 for all inputs in setup all categories ([f59d6d7](https://github.com/explore-siargao/es-main/commit/f59d6d73232c606722e00e4dad0382dd406b44be))
- **web:** Added function onClick on map location marker change position ([e355191](https://github.com/explore-siargao/es-main/commit/e3551917f7a844d6c213e502fabdacd988587af3))
- **web:** Apply the map logic onclick of category location setup to activity itinerary ([f281fd1](https://github.com/explore-siargao/es-main/commit/f281fd1c10fbe6cb677230d5a1840405c287e7b3))
- **web:** blog general ui ([7b51b35](https://github.com/explore-siargao/es-main/commit/7b51b3598f748f94604e0726eb5546b1765ed9ec))
- **web:** Connect whole place beds payloads frontend to backend ([44e0fe6](https://github.com/explore-siargao/es-main/commit/44e0fe618cff0664d4683fdf220583bdfdc82710))
- **web:** Connected available backend to rental public single page ([7f7000d](https://github.com/explore-siargao/es-main/commit/7f7000dad10b678ae020d264d9b96ebd6dda79d3))
- **web:** Connected Whole place bedrooms to backend ([44e0fe6](https://github.com/explore-siargao/es-main/commit/44e0fe618cff0664d4683fdf220583bdfdc82710), [44e0fe6](https://github.com/explore-siargao/es-main/commit/44e0fe618cff0664d4683fdf220583bdfdc82710))
- **web:** Corrected the typo, made the map scrollable and editable based on condition ([8566212](https://github.com/explore-siargao/es-main/commit/856621257400ee0228193d42dfeba2880f064649), [8566212](https://github.com/explore-siargao/es-main/commit/856621257400ee0228193d42dfeba2880f064649))
- **web:** Corrected typo in description and put explain in detail how to get there ([8566212](https://github.com/explore-siargao/es-main/commit/856621257400ee0228193d42dfeba2880f064649))
- **web:** guide location guide ui ([2d3fb6d](https://github.com/explore-siargao/es-main/commit/2d3fb6d2b6ee6e264eb9293bfac7e8a1fdeaf605), [164d577](https://github.com/explore-siargao/es-main/commit/164d5779b12b12228735a2effba1043c118b2fbd))
- **web:** make insights payment history and earnings in insights sections ([a3f4c53](https://github.com/explore-siargao/es-main/commit/a3f4c53b0e7e76c2dec9bfe5c761efb016b94b2a), [b234e18](https://github.com/explore-siargao/es-main/commit/b234e1831bba86af439b91b2423467603b81b46a))
- **web:** On bed and room name make it select with custom input ([b93be2a](https://github.com/explore-siargao/es-main/commit/b93be2ae002e58d0e9cac3638e2d676447297c92))
- **web:** property single view ([44fb83a](https://github.com/explore-siargao/es-main/commit/44fb83a30373724eefffd957ca24414011b3546a), [cfc10d9](https://github.com/explore-siargao/es-main/commit/cfc10d9fad88571232926fb851fd7de2af6e1cbf))
- **web:** Put all the maps in modal ([959783a](https://github.com/explore-siargao/es-main/commit/959783a8aec5b6ff83a2b0e6180783d04997c161))

### Bug Fixes

- **api:** Fixed error on wrong field name on activity price ([54253be](https://github.com/explore-siargao/es-main/commit/54253bebfcc88c723fc4e94f878a88fc9f51a547))
- **api:** Fixed error on wrong field name on activity price ([2cf8d9c](https://github.com/explore-siargao/es-main/commit/2cf8d9c20103c5d0cfba472f1d175d200145216d))
- build errors ([c667544](https://github.com/explore-siargao/es-main/commit/c6675443d9cd89b87261027506d3f38a360d38f6))
- replace guest number with category on rentals search bar ([e66fa5d](https://github.com/explore-siargao/es-main/commit/e66fa5dbfd83eb33c737dfd8b261173dd917154e))
- **web:** Fixed error on saving rental price required field cannot be empty even if theres a value ([0a3ff13](https://github.com/explore-siargao/es-main/commit/0a3ff1384414f74d2775a4567a2d95d4b7f97795))

## [0.5.0](https://github.com/explore-siargao/es-main/compare/v0.4.0...v0.5.0) (2024-07-01)

### Features

- add navigation buttons and modal for calendar ([7fa7c4c](https://github.com/explore-siargao/es-main/commit/7fa7c4c7b7153e435b9f22a3dd490bff975f24a0))
- add quantity to category ([a362396](https://github.com/explore-siargao/es-main/commit/a362396d0cd97985759a48a34227d98f0f61a45c))
- add reservation calendar for rentals and activities ([4110d77](https://github.com/explore-siargao/es-main/commit/4110d77c6739a9e3dc4d05380575f9ad77ae73a5))
- Added activity photos endpoint and implement it to frontend ([e7c30bd](https://github.com/explore-siargao/es-main/commit/e7c30bd205fde0c88690a3bb65eb450e41e98fb6))
- Added suspense loading and global catch all error ([d9464f9](https://github.com/explore-siargao/es-main/commit/d9464f941d7cc6b1bd85540ae867cf8561438ee8))
- **api:** Added add property type to api v2 ([ab1325a](https://github.com/explore-siargao/es-main/commit/ab1325a690b71e178869d899bf617e22eb7edd66))
- **api:** Added add property type to api v2 ([ae4f497](https://github.com/explore-siargao/es-main/commit/ae4f4971a09345429351277f0cc6c4d64c3bb43d))
- **api:** Added get property facilities endpoint to api v2 ([3061414](https://github.com/explore-siargao/es-main/commit/30614141e8d1cc9ae92e4db120492605e9e9dcea))
- **api:** Added get property facilities endpoint to api v2 ([95a5936](https://github.com/explore-siargao/es-main/commit/95a5936ba1ef2d99186be3bde3d27f02c7fafe13))
- **api:** Convert Mock add Itinerary endpoint to api v2 ([bf7d659](https://github.com/explore-siargao/es-main/commit/bf7d659e1f3c054f7e88f7d23844f89bc1314971))
- **api:** Convert Mock add Itinerary endpoint to api v2 ([bf7d659](https://github.com/explore-siargao/es-main/commit/bf7d659e1f3c054f7e88f7d23844f89bc1314971))
- **api:** Converted create bed unit endpoint to api v2 ([5734bc2](https://github.com/explore-siargao/es-main/commit/5734bc25fb90ee5ac3dfe79d4f5359262f913c88))
- **api:** Converted create room unit endpoint to api v2 ([7b31792](https://github.com/explore-siargao/es-main/commit/7b31792996e47ebca7e9321a1b9925792ca124d8))
- **api:** Converted create whole place unit endpoint to api v2 ([1ab8f1f](https://github.com/explore-siargao/es-main/commit/1ab8f1fe2f983b8b50a0d01f0bc0ac67ccd9168f))
- **api:** Converted create whole place unit endpoint to api v2 ([7c39aae](https://github.com/explore-siargao/es-main/commit/7c39aae519ca06fda4db40a35ab6a4993b8b40df))
- **api:** Converted get bookable units by category ([60bdc6e](https://github.com/explore-siargao/es-main/commit/60bdc6e212cb7a3bd86ddd1c277f56007477fbd4))
- **api:** Converted get property basic info endpoint to api v2 ([af7e905](https://github.com/explore-siargao/es-main/commit/af7e905a0e2d3240df066af8a873237c4946610a))
- **api:** Converted get property basic info endpoint to api v2 ([a98fa45](https://github.com/explore-siargao/es-main/commit/a98fa45f3d13ea672781095dd078b6e599a8ad69))
- **api:** Converted get property finished-sections to api v2 ([28f9d97](https://github.com/explore-siargao/es-main/commit/28f9d9758b8f85689b56679a524b93f96a73f039))
- **api:** Converted get property finished-sections to api v2 ([0c89448](https://github.com/explore-siargao/es-main/commit/0c8944885eb161fa772f7434b6041df8b9fa31ce))
- **api:** Converted get property location endpoint to api v2 ([8b8f1b1](https://github.com/explore-siargao/es-main/commit/8b8f1b1694bd137fdf8872581f6c358eef10883b))
- **api:** Converted get property policies to api v2 ([8bc774f](https://github.com/explore-siargao/es-main/commit/8bc774f0b868b73da5cc4a0c667a8f7dc95ed0a7))
- **api:** Converted get property policies to api v2 ([43700ca](https://github.com/explore-siargao/es-main/commit/43700cad6af0ad6e113459bd04acadc3f964b87a))
- **api:** Converted property update finished sections to api v2 ([06883fd](https://github.com/explore-siargao/es-main/commit/06883fd82138d3c6e7ca334431b11640ea4ff239))
- **api:** Converted property update finished sections to api v2 ([f6c5358](https://github.com/explore-siargao/es-main/commit/f6c5358b441caccd9523df705f2c0a000683eb4a))
- **api:** Converted property bookable unit get amenities to api v2 ([e088afa](https://github.com/explore-siargao/es-main/commit/e088afac7eeac49cd97e36ab4a8a69c737ffdb8b))
- **api:** Converted property bookable unit get amenities to api v2 ([e088afa](https://github.com/explore-siargao/es-main/commit/e088afac7eeac49cd97e36ab4a8a69c737ffdb8b))
- **api:** Converted property get bookable unit price to api v2 ([408a485](https://github.com/explore-siargao/es-main/commit/408a4853d4b07179705fcd7eaeac7f360db752fd))
- **api:** Converted property update amenities to api v2 ([2fcc375](https://github.com/explore-siargao/es-main/commit/2fcc37579847f13a20da720ba62701510b5277e4))
- **api:** Converted property update facilities to api v2 ([d7233f1](https://github.com/explore-siargao/es-main/commit/d7233f1082c68d5a3ec0fd084016d12912a380d0))
- **api:** Converted property update status endpoint to api v2 ([e1c6e00](https://github.com/explore-siargao/es-main/commit/e1c6e000f42a9295b3507eefcee39fe32ba87c05))
- **api:** Converted property update status endpoint to api v2 ([913cb57](https://github.com/explore-siargao/es-main/commit/913cb57ada96097db3ebe418ac14e673c82936ba))
- **api:** Converted property update status endpoint to api v2 ([d75e883](https://github.com/explore-siargao/es-main/commit/d75e8834e9526b1891451775507b0e8532e00b76))
- **api:** Converted update policies by property endpoint to api v2 ([6c7c56d](https://github.com/explore-siargao/es-main/commit/6c7c56d0db4ce8bf74ea5d19831506ad59e35326))
- **api:** Converted update property basic info endpoint to api v2 ([cad19d1](https://github.com/explore-siargao/es-main/commit/cad19d151c38ae1c3b2aa67e710d27b29af07830))
- **api:** Converted update property bookable unit price to api v2 ([07b8a82](https://github.com/explore-siargao/es-main/commit/07b8a82a2bef29f592baa93ef439cc6a0719ea66))
- **api:** Converted update property bookable unit price to api v2 ([07b8a82](https://github.com/explore-siargao/es-main/commit/07b8a82a2bef29f592baa93ef439cc6a0719ea66))
- **api:** Converted update property location endpoint to api v2 ([4740cc9](https://github.com/explore-siargao/es-main/commit/4740cc9f1641ea30731bf3177ad8f8d59d965e55))
- **api:** Converted update property type endpoint to api v2 ([5436ad4](https://github.com/explore-siargao/es-main/commit/5436ad488991a599200f6b363e8ea698dd245268))
- **api:** Converted update property type endpoint to api v2 ([7588cbf](https://github.com/explore-siargao/es-main/commit/7588cbfaa7db00db0c3aeb914b17d699104d4379))
- **api:** create reservation zod schema ([d52f1c8](https://github.com/explore-siargao/es-main/commit/d52f1c8daba3231c57cdc29346ca2c0cc3fe2c7e))
- **api:** create reservation zod schema ([d52f1c8](https://github.com/explore-siargao/es-main/commit/d52f1c8daba3231c57cdc29346ca2c0cc3fe2c7e))
- **api:** create reservation zod schema ([d52f1c8](https://github.com/explore-siargao/es-main/commit/d52f1c8daba3231c57cdc29346ca2c0cc3fe2c7e))
- **api:** Created add photos in bookable unit endpoint api v2 ([a767ede](https://github.com/explore-siargao/es-main/commit/a767edef84808ff2c565eb4aad14ddf01c58b556))
- **api:** Created reservation model schema ([3f792a7](https://github.com/explore-siargao/es-main/commit/3f792a72f689badd1d16b631b70f3e5caa3a1718))
- **api:** Created update basic info for bed unit api v2 ([13dde06](https://github.com/explore-siargao/es-main/commit/13dde065fad944e8b2b2ddc28a047663dac8c3d3))
- **api:** Created update basic info for bed unit api v2 ([13dde06](https://github.com/explore-siargao/es-main/commit/13dde065fad944e8b2b2ddc28a047663dac8c3d3))
- **api:** Created update room unit basic info api v2 ([ecaf205](https://github.com/explore-siargao/es-main/commit/ecaf205bbfd8bf4ed16c792329d06bc94cb2a54c))
- **api:** Created update whole place unit basic info api v2 ([9b92b58](https://github.com/explore-siargao/es-main/commit/9b92b58c00095787643abf40d03199c1e3683b7f))
- Cleanup reservation calendar and table ([dd5d1de](https://github.com/explore-siargao/es-main/commit/dd5d1de1bcd90ba2ed6a37b82f6a1b1983d62a29))
- Converted property photos to api v2 ([3ccc27c](https://github.com/explore-siargao/es-main/commit/3ccc27cb312671d8d527ae364cdba8d1729488fe))
- Corrected display information in properties list page ([e0f000e](https://github.com/explore-siargao/es-main/commit/e0f000ed59c441f3b701788129fcf1138123701d))
- Created update unit whole place ([2c4638f](https://github.com/explore-siargao/es-main/commit/2c4638f659bce2cba9ef6f8d624582726b627841))
- Created update unit whole place ([2c4638f](https://github.com/explore-siargao/es-main/commit/2c4638f659bce2cba9ef6f8d624582726b627841))
- Created update unit room frontend ([a8d4389](https://github.com/explore-siargao/es-main/commit/a8d4389514bdb7256a01d1fb98e63b049a9f19c4))
- Created update unit room frontend ([a8d4389](https://github.com/explore-siargao/es-main/commit/a8d4389514bdb7256a01d1fb98e63b049a9f19c4))
- Disabled v1 rest api except listings ([2231298](https://github.com/explore-siargao/es-main/commit/223129817b950868ce59f48461a8d212a3f0a186))
- editable room name and room quantity ([3715574](https://github.com/explore-siargao/es-main/commit/3715574320811298e339c6c53259f8f4e92cd2c3))
- Implement api v2 to property summary available data only ([85a3b21](https://github.com/explore-siargao/es-main/commit/85a3b21f5b55af063642b1a7e937c311f2be1e67))
- Implement update itinerary to frontend ([79bcc6d](https://github.com/explore-siargao/es-main/commit/79bcc6d222a2fa86e9b10e538d8307d444143e6b))
- Implement update property basic info api v2 to frontend ([5167f25](https://github.com/explore-siargao/es-main/commit/5167f2581365de02d54adf2c9926e379fa3ba808))
- Implement update property location api v2 to frontend ([8a64778](https://github.com/explore-siargao/es-main/commit/8a647783924b9d6e9d47704884b7de88ac1ce145))
- Implemented get itinerary to frontend ([662a375](https://github.com/explore-siargao/es-main/commit/662a375f963e57ca1f929af2050daac0d61cfa68))
- Implemented get itinerary to frontend ([662a375](https://github.com/explore-siargao/es-main/commit/662a375f963e57ca1f929af2050daac0d61cfa68))
- Implemented get property by id to frontend ([60ca2c2](https://github.com/explore-siargao/es-main/commit/60ca2c2128282743003a29696345952734c56949))
- Implemented photos in property frontend ([20cfdc3](https://github.com/explore-siargao/es-main/commit/20cfdc39cf9201c42106623d19318f1ab4528cf9))
- Implemented update property type api v2 to frontend ([841e436](https://github.com/explore-siargao/es-main/commit/841e4369db772b10bd27736d5ba522f822cb2ece))
- Setup property edit UI logics ([e274fcc](https://github.com/explore-siargao/es-main/commit/e274fccf12fbfdf2571b523498f0735fac734e29))
- single view activity ([10160e3](https://github.com/explore-siargao/es-main/commit/10160e31a5a1afc7d4a2a0e378f2bebac88ed9de))
- single view activity ui ([807f513](https://github.com/explore-siargao/es-main/commit/807f513556111272dc387fbd5fbd2a9be799988a))
- single view activity ui ([324f528](https://github.com/explore-siargao/es-main/commit/324f528fc84f3709c00d1a4510360ef75577a158))
- **web:** add the itinerary builder ([0c2c197](https://github.com/explore-siargao/es-main/commit/0c2c197de63ba2c1c380f58fd24f79a5e51c038f))
- **web:** add windy api to show the wind ([f7cbca5](https://github.com/explore-siargao/es-main/commit/f7cbca5e3b1c2c388b94372cc55f273d589cd861))
- **web:** Added Bed bookable unit ([e796781](https://github.com/explore-siargao/es-main/commit/e796781dd03681fe6203d3cb287d7fe84c04b07c))
- **web:** Added units in summary ([c3307c8](https://github.com/explore-siargao/es-main/commit/c3307c81452092a22a64a1613b3aaf3447f62dfd))
- **web:** Added units in summary ([e6593b0](https://github.com/explore-siargao/es-main/commit/e6593b02d72fcb937b167e4d97729d28b9b35e57))
- **web:** Converted delete property endpoint to api v2 ([056ee23](https://github.com/explore-siargao/es-main/commit/056ee23bf48c84165c21a2d3b96af1becb4e962f))
- **web:** Converted get property type endpoint to api v2 ([16f9f81](https://github.com/explore-siargao/es-main/commit/16f9f81a4bf801bcb54c27fdd5ef96e40d2a6bfa))
- **web:** Converted get property type endpoint to api v2 ([e3d1f7f](https://github.com/explore-siargao/es-main/commit/e3d1f7f05ce6913f323d399166955c2d3badbc40))
- **web:** Disabled Property type options in edit property type ([e9487d7](https://github.com/explore-siargao/es-main/commit/e9487d77c4b620d68d3680ec0765a178616477c4))
- **web:** Fixed already filled amenities ([dc55e89](https://github.com/explore-siargao/es-main/commit/dc55e894a3dc9f53d13592c5111df8b4b5e557fb))
- **web:** Fixed error on adding facilities required 1 even if its already had ([4578985](https://github.com/explore-siargao/es-main/commit/45789856a74366451c99d679c3a4c3d89ef108b7))
- **web:** Fixed error on adding facilities required 1 even if its already had ([e2b8076](https://github.com/explore-siargao/es-main/commit/e2b807672d16cada3af9cc80e57f83762e0427f5))
- **web:** Fixed input number in whole place error if click add ([59adb10](https://github.com/explore-siargao/es-main/commit/59adb10b857d41883fa28de12970ceea0c06d159))
- **web:** Implement delete property to frontend ([f3e90e2](https://github.com/explore-siargao/es-main/commit/f3e90e2378cdcfcb4c77223c9d5189ccfdbd9b0e))
- **web:** Implement update property policies api v2 to frontend ([a5f0b75](https://github.com/explore-siargao/es-main/commit/a5f0b75b00d1ba797433cfda6c8f04c129b5c8d1))
- **web:** Implement update property status api v2 to frontend ([174c169](https://github.com/explore-siargao/es-main/commit/174c169c97c95668e612e7bf80c3b5301b0e222e))
- **web:** Implemented add blank property to frontend ([6a0ef91](https://github.com/explore-siargao/es-main/commit/6a0ef91d4bdcf278f30913267cd3dbe257bb85ca))
- **web:** Implemented get property by host to frontend ([a754ff1](https://github.com/explore-siargao/es-main/commit/a754ff167ca30d12211a50d26ca042b8a9d51e74))
- **web:** Implemented update facilities endpoint api v2 to frontend ([152c66d](https://github.com/explore-siargao/es-main/commit/152c66d56ea4d6dee50ce5a826f7eabdebb41426))
- **web:** Include Photos and facilities to current summary ([df50958](https://github.com/explore-siargao/es-main/commit/df50958683602e06894c07e2eb1968032e087058))
- **web:** rental single view ([1777c69](https://github.com/explore-siargao/es-main/commit/1777c69bdb246431a4cc5b4371e8abfd20feb2e6))
- **web:** windy api to show the wind ([f7cbca5](https://github.com/explore-siargao/es-main/commit/f7cbca5e3b1c2c388b94372cc55f273d589cd861))

### Bug Fixes

- activity Itinerary code base ([28e5c52](https://github.com/explore-siargao/es-main/commit/28e5c5273cd86617d9d1e9ab5ec8ce3caee80bfb))
- **api:** Backend policies additional rules not included in process ([52fc8a2](https://github.com/explore-siargao/es-main/commit/52fc8a2cacb90342bcc5572b39b84001d497848c))
- **api:** Fixed sonar issue ([4740cc9](https://github.com/explore-siargao/es-main/commit/4740cc9f1641ea30731bf3177ad8f8d59d965e55))
- **api:** Removed unused imports in units.ts ([60bdc6e](https://github.com/explore-siargao/es-main/commit/60bdc6e212cb7a3bd86ddd1c277f56007477fbd4))
- **api:** Resolved sonar issue in create unit endpoint ([7b31792](https://github.com/explore-siargao/es-main/commit/7b31792996e47ebca7e9321a1b9925792ca124d8))
- Error on amenities frontend and backend ([c5328da](https://github.com/explore-siargao/es-main/commit/c5328dac0411309f0a6282b85351543b8da50c58))
- Error on unchecking policies also added as new policies ([6033ee2](https://github.com/explore-siargao/es-main/commit/6033ee21a3688ce6f73f26845d1a5ab272621c9e))
- Fixed do not render additional policy if policy is empty in summary ([44cdeda](https://github.com/explore-siargao/es-main/commit/44cdeda0a9a2bbadc3671c6dd1e52c277f632304))
- Fixed do not render additional policy if policy is empty in summary ([4dbefdd](https://github.com/explore-siargao/es-main/commit/4dbefddae962c2102b88f91de8202268c4a1bdf0))
- Fixed founded bugs in listing activities during feature testing ([cd00371](https://github.com/explore-siargao/es-main/commit/cd0037139b04b64d2ec9195fc8ba725ad2493e5e))
- Fixed minor bugs in properties ([9881630](https://github.com/explore-siargao/es-main/commit/98816302bff28baf53b99a42fb8313f77fbd002d))
- Process cleanup for rentals and activities ([5db02a0](https://github.com/explore-siargao/es-main/commit/5db02a055657914f3a3bceffa2d13b7c28d87d3f))
- Removed save change button in edit property type ([a15c6e9](https://github.com/explore-siargao/es-main/commit/a15c6e91724558793f7c13e68d7a7baaabe1d9bf))
- Rename activity hooks and delete unnecessary ([e242b0f](https://github.com/explore-siargao/es-main/commit/e242b0fdb865f521273edd8c5307231a7e0fced9))
- Resolve conflicts on merging 251 - 277 ([75bfeed](https://github.com/explore-siargao/es-main/commit/75bfeed5ffe5b8aac12ed7dd1a22a1fca303581d))
- Resolved conflict on merging 262 to 251 ([cf7392f](https://github.com/explore-siargao/es-main/commit/cf7392f836b9ef4091e5ddb6078e76fa525cb8c2))
- Resolved sonar issues ([59adb10](https://github.com/explore-siargao/es-main/commit/59adb10b857d41883fa28de12970ceea0c06d159))
- **web:** Fixed breadcrumbs in edit page will be title of property ([a4f07bf](https://github.com/explore-siargao/es-main/commit/a4f07bf13080bf0950f3f6bf723fdc1dedfbcd24))
- **web:** Fixed error on need to click again before saving in property type and location ([0c7e8b5](https://github.com/explore-siargao/es-main/commit/0c7e8b5b900a81f38a5771a45e7bd64b1cea706b))
- **web:** Fixed error on property setup locations ([72f609a](https://github.com/explore-siargao/es-main/commit/72f609a406a46af910525bc0f3bdd3c5ac9390b8))
- **web:** Fixed error on unit back button ([08aac62](https://github.com/explore-siargao/es-main/commit/08aac623aeb78f56463e79a5770ac6a88eebf807))
- **web:** Fixed error on unit back button ([2ef429d](https://github.com/explore-siargao/es-main/commit/2ef429d9d8c0a344c5315204b2df54ae76eacb76))
- **web:** Fixed not all in property setup sidebar not turning to green ([ed325c8](https://github.com/explore-siargao/es-main/commit/ed325c8af49f7149003ed17ae98a8edf8b3c6ddb))
- **web:** Fixed property location not turning green after saving and remove unwanted inputs ([cb1c03d](https://github.com/explore-siargao/es-main/commit/cb1c03db9a4f0767b18316d5199719767053936e))
- **web:** Fixed property location not turning green after saving and remove unwanted inputs ([cb1c03d](https://github.com/explore-siargao/es-main/commit/cb1c03db9a4f0767b18316d5199719767053936e))
- **web:** fixed sonar issue ([e796781](https://github.com/explore-siargao/es-main/commit/e796781dd03681fe6203d3cb287d7fe84c04b07c))
- **web:** Fixed unit saving even if no photos or no amenities checked ([c3307c8](https://github.com/explore-siargao/es-main/commit/c3307c81452092a22a64a1613b3aaf3447f62dfd))
- **web:** Fixed unit saving even if no photos or no amenities checked ([b596a1d](https://github.com/explore-siargao/es-main/commit/b596a1decbaa5c5461e2720f5986525f87f50399))
- **web:** Fixed wrong redirect in property list and facilities to units and policies not proceed to summary ([9a5e399](https://github.com/explore-siargao/es-main/commit/9a5e399bf0a14752ce1c8b922d1f13a8b3abb418))
- **web:** Fixed wrong redirect in saving whole place and fixed not saving whole place qty ([a629f21](https://github.com/explore-siargao/es-main/commit/a629f21295ce886d3d76a924a222364240c880f0))
- **web:** Property Edit Mode return NaN propertyId ([fca498d](https://github.com/explore-siargao/es-main/commit/fca498d56e22c668a9a1bbe54a0a6c89db56c616))

### Miscellaneous Chores

- release 0.5.0 ([e4ebf54](https://github.com/explore-siargao/es-main/commit/e4ebf54e3bcc7006c1bfbf937951e757aed0cba7))

## 0.4.0 (2024-06-13)

### Features

- Add Address ([b74d290](https://github.com/explore-siargao/es-main/commit/b74d290e1f4a3ccbca65d2115ecebd7e3b9e4693))
- Added and update itinerary UI, database and zod ([792c874](https://github.com/explore-siargao/es-main/commit/792c874b85048decb3d49f50e539c4b1af121269))
- Added photos in Activity setup and edit ([f28aa15](https://github.com/explore-siargao/es-main/commit/f28aa15dbb94a33d025e317f519ad59379b9a6b5))
- Added useGetRentalPricing hook v2 ([8cc3a63](https://github.com/explore-siargao/es-main/commit/8cc3a6353fcc47d5ce3058bcc91e1aa9194e4a11))
- **api:** Added api v2 get finished section endpoint ([7877460](https://github.com/explore-siargao/es-main/commit/7877460df01e6ca44a01a0df36274fb641f9de3e))
- **api:** Added database model activities and itineraries ([262c9c5](https://github.com/explore-siargao/es-main/commit/262c9c51502fbbab811457d5f4427864fcf493fc))
- **api:** Added delete rental photo endpoint ([8672e61](https://github.com/explore-siargao/es-main/commit/8672e6178b50b86f769eb0319570ec71f3cd62dc))
- **api:** Added get addons endpoint ([1857eb1](https://github.com/explore-siargao/es-main/commit/1857eb1f8320f61a30cf7b158fbcd772deaa26d1))
- **api:** Added get one activity endpoint api v2 ([40446c0](https://github.com/explore-siargao/es-main/commit/40446c09181a452d142ee470eaabca908d59cfef))
- **api:** Added get rental location v2 endpoint ([9616538](https://github.com/explore-siargao/es-main/commit/9616538bbb7fc1ee17ffab630846a0927bd9c1e4))
- **api:** Added get rental rates endpoints ([8101de1](https://github.com/explore-siargao/es-main/commit/8101de1872f19dab4cb9f0c2bef602ee780b3e6d))
- **api:** Added property photos endpoints ([edee201](https://github.com/explore-siargao/es-main/commit/edee201b8420470f3586c2f88391baa9bf4c4959))
- **api:** Added update addons endpoint ([f29dcb7](https://github.com/explore-siargao/es-main/commit/f29dcb71e43656ea12bd0251b788d45a837c2f40))
- **api:** Added update finished sections endpoint ([a6460ed](https://github.com/explore-siargao/es-main/commit/a6460edb100e209d6d309ca223562a397db3c667))
- **api:** Added update Rental Location endpoint ([8c2342a](https://github.com/explore-siargao/es-main/commit/8c2342a493ee439fd8477892524173eecd52d680))
- **api:** Added update Rental Location endpoint ([8c2342a](https://github.com/explore-siargao/es-main/commit/8c2342a493ee439fd8477892524173eecd52d680))
- **api:** Added update Rental Location endpoint ([011c46f](https://github.com/explore-siargao/es-main/commit/011c46f3c5abd15b40a59e261bd0159242996aae))
- **api:** Added update Rental Location endpoint ([15ee258](https://github.com/explore-siargao/es-main/commit/15ee2584687194554f1709810854975e1f679469))
- **api:** Added update rental status endpoint in api v2 ([b0f733e](https://github.com/explore-siargao/es-main/commit/b0f733e6a4e5a923048a74696cd9fef8fe2491f2))
- **api:** Convert Update activity finished section to api v2 ([a3d474f](https://github.com/explore-siargao/es-main/commit/a3d474fe53fa5679f7492894366253982fba5c28))
- **api:** Convert Update activity inclussions to api v2 ([6da4056](https://github.com/explore-siargao/es-main/commit/6da40561fb5c95927e169cce1ae0c4dc7e73058c))
- **api:** Convert Update additional info to api v2 ([ec99d3f](https://github.com/explore-siargao/es-main/commit/ec99d3fe7bcce347687f51ab3a1311dbd62c5e6c))
- **api:** Convert Update additional info to api v2 ([ec99d3f](https://github.com/explore-siargao/es-main/commit/ec99d3fe7bcce347687f51ab3a1311dbd62c5e6c))
- **api:** Converted add blank activity to api v2 ([4740dc7](https://github.com/explore-siargao/es-main/commit/4740dc7e681b5c56ff6bd0b5a74e63f26800845a))
- **api:** Converted get activity basic info to api v2 ([1ef4822](https://github.com/explore-siargao/es-main/commit/1ef4822761e345f9665cf6210a31ec5d111d79ef))
- **api:** Converted get activity finished section to api v2 ([ff9088d](https://github.com/explore-siargao/es-main/commit/ff9088d0e8c6e3c847d8d17767a6a4387e374961))
- **api:** Converted get activity inclussions to api v2 ([88bb633](https://github.com/explore-siargao/es-main/commit/88bb6332d048abb4e0ed42d4beedfc71c7294773))
- **api:** Converted get additional info api v2 ([5f24897](https://github.com/explore-siargao/es-main/commit/5f2489763353dcc64a43590f06cfb186c6c6e249))
- **api:** Converted update activity basic info api v2 ([183d1f3](https://github.com/explore-siargao/es-main/commit/183d1f36394b8c829470f225c5fae1d3dfb1f736))
- **api:** Converted update activity basic info api v2 ([183d1f3](https://github.com/explore-siargao/es-main/commit/183d1f36394b8c829470f225c5fae1d3dfb1f736))
- **api:** Converted update activity status to api v2 ([32efe05](https://github.com/explore-siargao/es-main/commit/32efe0572099baabdf61125f896ed1526f8f71fa))
- **api:** Created get activity by host endpoint api v2 ([25f1857](https://github.com/explore-siargao/es-main/commit/25f18576cf135a9de9fcc67c62493d25c6199350))
- **api:** Created isHostRentalOwner2 middleware and apply it to index.ts ([769ce38](https://github.com/explore-siargao/es-main/commit/769ce3883bf655dc2b89927e64a917c04b6a6a4f))
- **api:** Created update rental rates endpoint ([5eaa8d6](https://github.com/explore-siargao/es-main/commit/5eaa8d6a4b3f6c79f00b4734df40d169d2b5ceb4))
- **api:** Created update rental rates endpoint ([5eaa8d6](https://github.com/explore-siargao/es-main/commit/5eaa8d6a4b3f6c79f00b4734df40d169d2b5ceb4))
- **api:** Created update rental rates endpoint ([0e88917](https://github.com/explore-siargao/es-main/commit/0e889171ddc9067ed9d1f6102e6162249d27ee0f))
- **api:** Created update rental rates endpoint ([a963e5f](https://github.com/explore-siargao/es-main/commit/a963e5ffe72f89ad0f39df28d83ef599d4022f2d))
- **api:** Removed import of dbActivities from isHostActivityOwner that may caus conflict ([4740dc7](https://github.com/explore-siargao/es-main/commit/4740dc7e681b5c56ff6bd0b5a74e63f26800845a))
- **api:** story edit photo info endpoint ([faa0504](https://github.com/explore-siargao/es-main/commit/faa05043ef2b97e7810fdbc9222408e51459dc03))
- **api:** update rental photos endpoint ([b2f641b](https://github.com/explore-siargao/es-main/commit/b2f641bb064a0df3e7ddc53bf97af7be23dcd94f))
- Created activity summary UI ([786997e](https://github.com/explore-siargao/es-main/commit/786997eb13181c71cdbf3fa27e6cbfe5d9433067))
- Implement rental upload photos ([206a4d3](https://github.com/explore-siargao/es-main/commit/206a4d3aa1eee76aa80815adfe7b3ddcbc3254c7))
- Implemented api v2 to frontend ([cf759b9](https://github.com/explore-siargao/es-main/commit/cf759b91fdd52ddc17c02b86192d88a2705e9547))
- Implemented forgot password api v2 to frontend ([cee50a3](https://github.com/explore-siargao/es-main/commit/cee50a31b4391fbd17af9af1fa85e2ae49354bc2))
- Implemented get activities by host api v2 ([734549a](https://github.com/explore-siargao/es-main/commit/734549ad9d53d765cd9e4d1b7b77f36864b72a16))
- Implemented get inclusions api v2 to frontend ([503c443](https://github.com/explore-siargao/es-main/commit/503c44319f916939f3e8e2f6d4447f9418178ba7))
- Implemented get inclusions api v2 to frontend ([ef014ab](https://github.com/explore-siargao/es-main/commit/ef014ab742dc914617d1d5e72dcd5cceeb13174c))
- Implemented get rental details v2 in frontend and remove console.log in backend ([bb5a9dc](https://github.com/explore-siargao/es-main/commit/bb5a9dc8229bfcf46b93d8ee347312b840d4b5ea))
- Implemented update finished section in frontend hook ([29821fa](https://github.com/explore-siargao/es-main/commit/29821fac15b8cb43c800bf8d5c4c330411cde2ca))
- Implemented update profile api v2 to frontend ([63a4cee](https://github.com/explore-siargao/es-main/commit/63a4ceee0d797a079ae20a7d7b477e33933c6779))
- Modified Be a Host hook to v2 ([f2a7d6f](https://github.com/explore-siargao/es-main/commit/f2a7d6fb370be6f03aeca06b676c52abbbb7e717))
- Modified useGetPaymentMethod hook to v2 ([91dcbb9](https://github.com/explore-siargao/es-main/commit/91dcbb9caa4ff279c1dd62945ae5aa0df4cf094f))
- Modified useGetRentalPhotosById hook to v2 ([8bc97e8](https://github.com/explore-siargao/es-main/commit/8bc97e8c3bde41ddd73e6bd3aca54edd28d22b67))
- Modified useUpdatePaymentMethod hook to v2 ([4988d69](https://github.com/explore-siargao/es-main/commit/4988d69dfebb3b6f468239b3d172d6189d74bc16))
- MongoDB Implementation and REST v1 to v2 conversion ([b160e6f](https://github.com/explore-siargao/es-main/commit/b160e6f145216c3c02c454da211137f6321f7e36))
- MongoDB Implementation and REST v1 to v2 conversion ([b160e6f](https://github.com/explore-siargao/es-main/commit/b160e6f145216c3c02c454da211137f6321f7e36))
- MongoDB Implementation and REST v1 to v2 conversion ([874da35](https://github.com/explore-siargao/es-main/commit/874da35b6550f4adc03f3d811c6debbfaf68df80))
- MongoDB Implementation and REST v1 to v2 conversion ([8209b24](https://github.com/explore-siargao/es-main/commit/8209b2425824679e003a01388afe7ce4376e247e))
- restaurant guide ui ([2f21912](https://github.com/explore-siargao/es-main/commit/2f2191253b3f14f1622a7123d38aa85cf04c3ca6))
- story rental photos endpoint ([6a623ab](https://github.com/explore-siargao/es-main/commit/6a623abbae9a4ec27e5f499617d775d619f62201))
- surf guide ui ([8ecd0e6](https://github.com/explore-siargao/es-main/commit/8ecd0e67c02d477622a2b02f23ad7da078199f65))
- Update Coupons ([bc29fae](https://github.com/explore-siargao/es-main/commit/bc29faefed70099b3558767f63dfc3168f49e4ab))
- **web:** Add Emergency Contact ([3f7618f](https://github.com/explore-siargao/es-main/commit/3f7618f966a75d8b0c16a9b6f15c5128559ffc6c))
- **web:** add export report excel file - earnings ([ddc050a](https://github.com/explore-siargao/es-main/commit/ddc050a0b41c3387dbf602bcb43ea69f7aa1bc2e))
- **web:** add export report excel file - payment history ([80bd530](https://github.com/explore-siargao/es-main/commit/80bd530d7c0c80334117405713eddcd622690f99))
- **web:** add export report excel file - payment history ([00eeb74](https://github.com/explore-siargao/es-main/commit/00eeb747d4515fdb2e99ea13779083c0ceb8632a))
- **web:** add the year and month filter with all option for month ([1126f33](https://github.com/explore-siargao/es-main/commit/1126f33bd540f3451d3aa3a4cf646f8bef003450))
- **web:** Added useGetActivityBasicInfo custom hook ([5e0f419](https://github.com/explore-siargao/es-main/commit/5e0f419fa0c861ade8678a56ebd436753842571f))
- **web:** Added useGetActivityBasicInfo custom hook ([5e0f419](https://github.com/explore-siargao/es-main/commit/5e0f419fa0c861ade8678a56ebd436753842571f))
- **web:** Added useGetRentalBasicInfo hook v2 ([bfb4b70](https://github.com/explore-siargao/es-main/commit/bfb4b703ee82fff2e3ea01ff40f81993d4fc5d55))
- **web:** Created isHostActivityOwner middleware v2 ([cbfd9f6](https://github.com/explore-siargao/es-main/commit/cbfd9f670ec09821fa1436d6701fbf66759bc237))
- **web:** export report excel file ([4d3bbac](https://github.com/explore-siargao/es-main/commit/4d3bbacb0aec40cef09152653234617dbf6084ca))
- **web:** fix the summary info box to reflect the new filter ([eebdd6b](https://github.com/explore-siargao/es-main/commit/eebdd6b2a68d54b5f3445497021d128cb333eee7))
- **web:** fix the summary info box to reflect the new filter ([eebdd6b](https://github.com/explore-siargao/es-main/commit/eebdd6b2a68d54b5f3445497021d128cb333eee7))
- **web:** general blog ui ([0d7c1a0](https://github.com/explore-siargao/es-main/commit/0d7c1a0d7ca5ed4aeda086f878ece4180530c04d))
- **web:** Implement Add Blank Rental Pending ([d761208](https://github.com/explore-siargao/es-main/commit/d7612084b9179380f28b03d370ea2d4b2ece2572))
- **web:** Implement Delete rental photo by photoId api v2 ([b84c176](https://github.com/explore-siargao/es-main/commit/b84c1767a18f160da4dc58aff0677711dc895e0a))
- **web:** Implement Edit rental photo info api v2 ([3bb9c5e](https://github.com/explore-siargao/es-main/commit/3bb9c5e2149cde481adb00b0b6c96a30d94eefc9))
- **web:** Implement Get Rental locations api v2 ([9016c5d](https://github.com/explore-siargao/es-main/commit/9016c5d3b66a77747c5741c42775c836cc84a652))
- **web:** Implement get single activity api v2 ([f7822aa](https://github.com/explore-siargao/es-main/commit/f7822aa14b5f2bed01c3e42a889d9bf3322550bc))
- **web:** Implement update activity basic info api v2 ([09d038e](https://github.com/explore-siargao/es-main/commit/09d038e81a39d6d9c4acdbcfd44ac6015ad0350e))
- **web:** Implement update activity inclussions api v2 ([82e65bd](https://github.com/explore-siargao/es-main/commit/82e65bdb1a8bf7b30dc2c151389443b2f060a09e))
- **web:** Implement update activity inclussions api v2 ([ef985d5](https://github.com/explore-siargao/es-main/commit/ef985d5301fc457e12f1fd01546dfe35599e572a))
- **web:** Implement update activity status api v2 ([82e65bd](https://github.com/explore-siargao/es-main/commit/82e65bdb1a8bf7b30dc2c151389443b2f060a09e))
- **web:** Implement update activity status api v2 ([73dc34f](https://github.com/explore-siargao/es-main/commit/73dc34f0f93fedba036ac431a67f078c5ea74b9b))
- **web:** Implement Update Rental Addons ([bc88397](https://github.com/explore-siargao/es-main/commit/bc8839710b253964b43446ec48c6829080ccaae7))
- **web:** Implement Update Rental Details ([0012773](https://github.com/explore-siargao/es-main/commit/0012773506f9f89bb9e94c205df5e1a0193deda6))
- **web:** Implement Update Rental Location ([c9af68e](https://github.com/explore-siargao/es-main/commit/c9af68e94208995e5d38a531724b2c079e54048e))
- **web:** Implement Update Rental Photos ([98a6a09](https://github.com/explore-siargao/es-main/commit/98a6a09dd25bb679592ce24c4e2f7dbfc98ad313))
- **web:** Implemented add blank activity api v2 to frontend ([e7a59f2](https://github.com/explore-siargao/es-main/commit/e7a59f29fb25549c53a3fde40e513614af97368a))
- **web:** Implemented api v2 to login ang register manual ([6f4ad51](https://github.com/explore-siargao/es-main/commit/6f4ad51aa02b425c865014342fb67f779bd019e8))
- **web:** Implemented can received email api v2 to frontend ([fbc4320](https://github.com/explore-siargao/es-main/commit/fbc4320cda1c549e8700a6fdbf08ca7b70434dfb))
- **web:** Implemented deactivate account api v2 to frontend ([3739d99](https://github.com/explore-siargao/es-main/commit/3739d99e21b9f792a0a33f03ede0c95a4a6cef87))
- **web:** Implemented delete rental api v2 to frontend hook ([a0efb38](https://github.com/explore-siargao/es-main/commit/a0efb38e5645802a6cb2d08a2fac207329d5ec95))
- **web:** Implemented get activity additional info api v2 ([2080404](https://github.com/explore-siargao/es-main/commit/20804046806c13c5f24c98b6533c1667804603c6))
- **web:** Implemented get activity finished sections api v2 ([82e65bd](https://github.com/explore-siargao/es-main/commit/82e65bdb1a8bf7b30dc2c151389443b2f060a09e))
- **web:** Implemented get activity finished sections api v2 ([82e65bd](https://github.com/explore-siargao/es-main/commit/82e65bdb1a8bf7b30dc2c151389443b2f060a09e))
- **web:** Implemented get activity finished sections api v2 ([d1305fa](https://github.com/explore-siargao/es-main/commit/d1305fa886957d00043762d395b151bb303d8370))
- **web:** Implemented get profile api v2 ([a9edde9](https://github.com/explore-siargao/es-main/commit/a9edde9debd7ab1da08a9ab6d9b88ba9b7485088))
- **web:** Implemented get rental by id api v2 ([c609fd8](https://github.com/explore-siargao/es-main/commit/c609fd88f1d199ee7f3d41c289da6301a508ede2))
- **web:** Implemented get tax by user api v2 to frontend ([061191c](https://github.com/explore-siargao/es-main/commit/061191cce51b3e8fb29f46c8ae25ce9d99204a02))
- **web:** Implemented google login and register v2 in frontend ([3262222](https://github.com/explore-siargao/es-main/commit/326222241f1b30696e6fa6a9c6ed9d2440eab499))
- **web:** Implemented logout api v2 to frontend ([039a4b3](https://github.com/explore-siargao/es-main/commit/039a4b3da16dd53a347b7230e22855198e89b9b5))
- **web:** Implemented update activity finished sections api v2 ([82e65bd](https://github.com/explore-siargao/es-main/commit/82e65bdb1a8bf7b30dc2c151389443b2f060a09e))
- **web:** Implemented update activity finished sections api v2 ([82e65bd](https://github.com/explore-siargao/es-main/commit/82e65bdb1a8bf7b30dc2c151389443b2f060a09e))
- **web:** Implemented update additional info api v2 in frontend ([4b668b8](https://github.com/explore-siargao/es-main/commit/4b668b8072f089fe6363344b7e4d65021b0ba3f6))
- **web:** Implemented update email api v2 to frontend ([f550eb6](https://github.com/explore-siargao/es-main/commit/f550eb6d3ae7eb3c961e618461112533e88b705e))
- **web:** Implemented update rental basic info api v2 to frontend ([7056cb2](https://github.com/explore-siargao/es-main/commit/7056cb2a683e28ceae287905d345ded698459fd0))
- **web:** Implemented update rental status api v2 in frontend ([115b71c](https://github.com/explore-siargao/es-main/commit/115b71cd505bb5b9bb644e5951a3cb0c0534ba0b))
- **web:** Implmented get session api v2 in frontend ([25ab270](https://github.com/explore-siargao/es-main/commit/25ab2701d9f17470405ee2df12f3197a238426a8))
- **web:** Modified useAddGovernmentId hook to v2 ([4f087c5](https://github.com/explore-siargao/es-main/commit/4f087c5741f3a27232885af6678ad47b5f2fff43))
- **web:** Modified useAddPaymentMethod hook to v2 ([417a4ee](https://github.com/explore-siargao/es-main/commit/417a4eedfda6032e4b21a1ae7b32c2c0ca80b04d))
- **web:** Modified useAddTax hook to v2 ([0b4c512](https://github.com/explore-siargao/es-main/commit/0b4c512bb910254365e8b5cf01694173adac0413))
- **web:** Modified useGetRentalAddOns hook to v2 ([cbbca7f](https://github.com/explore-siargao/es-main/commit/cbbca7f820fc6082a2fd08aa45a5b30dc50775ac))
- **web:** Modified useUpdateLanguage hook to v2 ([b1b6672](https://github.com/explore-siargao/es-main/commit/b1b6672da532722e761ba14c84ae2591c27be757))
- **web:** Modified useUpdatePersonalInfo hook to v2 ([286578d](https://github.com/explore-siargao/es-main/commit/286578d62d9b8f206a48c8f236b892d1b1c0085e))
- **web:** Modified useUpdateRentalPricing hook to v2 ([0a7263b](https://github.com/explore-siargao/es-main/commit/0a7263b99be11709cb9acafe51ecb271f618399c))
- **web:** Remove EmergencyContact ([741dd90](https://github.com/explore-siargao/es-main/commit/741dd9080ac66cccb2b7bc9b895acac8809d6393))
- **web:** Remove Payment Method ([5660f60](https://github.com/explore-siargao/es-main/commit/5660f605f18c592045bad000f604adc60cd282e8))

### Bug Fixes

- Addons not showing data in addons after saving ([3a4ce50](https://github.com/explore-siargao/es-main/commit/3a4ce50b07c3e1c61b71e664d5c4579ca97d490a))
- Addons not showing data in addons after saving ([3a4ce50](https://github.com/explore-siargao/es-main/commit/3a4ce50b07c3e1c61b71e664d5c4579ca97d490a))
- **api:** Changed isPending to Incomplete in adding blank rental ([8e32b92](https://github.com/explore-siargao/es-main/commit/8e32b923c346cdca360178720799330fcc444dfd))
- **api:** Changed the .id to \_id ([1ef4822](https://github.com/explore-siargao/es-main/commit/1ef4822761e345f9665cf6210a31ec5d111d79ef))
- **api:** Fixed error on sidebar no turning green after updating Addons ([39707dd](https://github.com/explore-siargao/es-main/commit/39707dd0d9f45b6fbbe19b12109887ca160ed2ed))
- **api:** Fixed sonar cloud issue ([32efe05](https://github.com/explore-siargao/es-main/commit/32efe0572099baabdf61125f896ed1526f8f71fa))
- **api:** Removed console log ([ff9088d](https://github.com/explore-siargao/es-main/commit/ff9088d0e8c6e3c847d8d17767a6a4387e374961))
- **api:** Wrong title of email in apply as host ([28a92a4](https://github.com/explore-siargao/es-main/commit/28a92a4e786489c8b3fee35fe6488cadb15c038e))
- Bug Add Rental ([e1c9629](https://github.com/explore-siargao/es-main/commit/e1c9629c57fd80f3282bc244d28cb9bea520626a))
- Fixed Activity Basic Info not saving the language ([c474d28](https://github.com/explore-siargao/es-main/commit/c474d284f231ef6535eb159ccdd5dc6c207f7945))
- Fixed and resolved conflict ([268769c](https://github.com/explore-siargao/es-main/commit/268769c188549d0f2e7d8ea2d1c148f0f1679f81))
- Fixed bug on not displaying current rental price ([bb49f83](https://github.com/explore-siargao/es-main/commit/bb49f83e4891f3d54e8b98002b8e70deeaa29bc8))
- Fixed error on adding rental details in engine capacity ([825f7a0](https://github.com/explore-siargao/es-main/commit/825f7a0a1f3c8e21b305deb37e5664c548ed9106))
- Fixed error on rental summary not showing all data and submit button not working ([96c2483](https://github.com/explore-siargao/es-main/commit/96c2483110e5b28fa757c9a4a495f15857059941))
- Fixed get and update additional info ([01d1bdd](https://github.com/explore-siargao/es-main/commit/01d1bddaeb803eb3845b83f830ab693f8f96e382))
- Fixed merge conflict ([1eb2177](https://github.com/explore-siargao/es-main/commit/1eb21775b9681aad3b970bd55ac2b15a5e6f658b))
- Fixed sonar cloud issue ([b5286e7](https://github.com/explore-siargao/es-main/commit/b5286e70324a9eb6918085c1df6062acdf494700))
- Fixed sonar cloud issue ([2e9933e](https://github.com/explore-siargao/es-main/commit/2e9933ec4c0d5bb8198456b17b20a59e2deef6de))
- Fixed sonar issue ([13b10f4](https://github.com/explore-siargao/es-main/commit/13b10f40bec5bc2614df53cc83c20d783518e55d))
- Fixed sonar issue ([a4acfd1](https://github.com/explore-siargao/es-main/commit/a4acfd1a7971ee13d43b05b63c2531d539f6c543))
- Fixed variable of host ([ad89b84](https://github.com/explore-siargao/es-main/commit/ad89b84c9bbb7dff029fc25a01b4de9466fb9ad2))
- Location not showing data after savings in rental location ([53f6a8e](https://github.com/explore-siargao/es-main/commit/53f6a8efc4d337d2df305ad034ea7d6587c51f8c))
- Make prettier format workflow apply to all branch ([bf76b54](https://github.com/explore-siargao/es-main/commit/bf76b548fd0cf0ea612bad3b9c42282bd13b77f5))
- Rearange sequence of endpoints ([916f8b3](https://github.com/explore-siargao/es-main/commit/916f8b36a2c1e69a967198d590ea5fa96c65de65))
- redirect after adding blank rental id is undefined ([88978be](https://github.com/explore-siargao/es-main/commit/88978beb212b5ac506471927beb77c0ee02e77f9))
- Remove duplicate endpoints in activity index.ts ([916f8b3](https://github.com/explore-siargao/es-main/commit/916f8b36a2c1e69a967198d590ea5fa96c65de65))
- remove unused imports ([8ecd0e6](https://github.com/explore-siargao/es-main/commit/8ecd0e67c02d477622a2b02f23ad7da078199f65))
- rental and activity bugs ([7d75b5a](https://github.com/explore-siargao/es-main/commit/7d75b5a7305d84aab1ef7ebec158f930a2c0e87e))
- Resolve issue ([e47bace](https://github.com/explore-siargao/es-main/commit/e47bace7b31f5c8fc92d32a4dedfd2991ef75608))
- Resolved request changes ([604d225](https://github.com/explore-siargao/es-main/commit/604d225a690547835344000a18616dd714ee4cc6))
- Revert some changes not related to task ([09d038e](https://github.com/explore-siargao/es-main/commit/09d038e81a39d6d9c4acdbcfd44ac6015ad0350e))
- **web:** Fix bug for rental details isRegistered vehicle radio button ([91310f7](https://github.com/explore-siargao/es-main/commit/91310f73634fab30b18e9938481b681d873f8bcc))
- **web:** Fixed activity inclusions and additional-info setup navigation and retrieving data ([ca21537](https://github.com/explore-siargao/es-main/commit/ca2153740f75e51ec40116161b8b9088b726eb4e))
- **web:** Fixed bug on activity inclussions included and not included inputs ([344267d](https://github.com/explore-siargao/es-main/commit/344267d642dcd31a0fa20a4f11198a007b359fe2))
- **web:** Fixed error on adding and edditing activity inclusions ([795f00d](https://github.com/explore-siargao/es-main/commit/795f00de0a2414ee26365579b8865a9a408311c1))
- **web:** Fixed error on getting data on activity details ([40ce7b2](https://github.com/explore-siargao/es-main/commit/40ce7b2fb20cf8f7772d0bb6e76cb6b5c29b8910))
- **web:** Fixed id names and endpoint ([82e65bd](https://github.com/explore-siargao/es-main/commit/82e65bdb1a8bf7b30dc2c151389443b2f060a09e))
- **web:** Fixed id names and endpoint ([82e65bd](https://github.com/explore-siargao/es-main/commit/82e65bdb1a8bf7b30dc2c151389443b2f060a09e))
- **web:** Fixed problem in foldering of useUpdateFinishedSections ([82e65bd](https://github.com/explore-siargao/es-main/commit/82e65bdb1a8bf7b30dc2c151389443b2f060a09e))
- **web:** Renamed filename and hook name for readability ([82e65bd](https://github.com/explore-siargao/es-main/commit/82e65bdb1a8bf7b30dc2c151389443b2f060a09e))
- **web:** Renamed filename and hook name for readability ([82e65bd](https://github.com/explore-siargao/es-main/commit/82e65bdb1a8bf7b30dc2c151389443b2f060a09e))

### Miscellaneous Chores

- release 0.4.0 ([8d11f2d](https://github.com/explore-siargao/es-main/commit/8d11f2d3c3cc71a8a2a7b5d10b4ceb8459226d9e))

## 0.3.0 (2024-05-29)

### Features

- Booking (item-single-view)

## 0.2.0 (2024-05-29)

### Features

- Regular Account

## 0.1.0 (2024-05-29)

### Features

- Registration and Authentication
