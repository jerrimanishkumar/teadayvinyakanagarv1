'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { X, Heart, Coffee, Utensils, Milk, Beer, Soup, Sandwich, Sun, Snowflake, IceCream2, Search, Martini,Layers3, CupSoda } from 'lucide-react'
import Image from 'next/image'
import compLgo from '.././app/compnaaylogo.webp'
import instaGram from '.././app/svgviewer.webp.webp'


const shopName = "TEA DAY"

const categoriesArray = [
  { key: "Tea", value: "Tea", icon: Coffee },
  { key: "Coffee", value: "Coffee", icon: Coffee },
  { key: "HotMilk", value: "Hot Milk", icon: Milk },
  { key: "Snacks", value: "Snacks", icon: Utensils },
  { key: "Milkshakes", value: "Milkshakes", icon: IceCream2 },
  { key: "Lemonades", value: "Lemonades", icon: Beer },
  { key: "SummerChills", value: "Summer Chills", icon: Sun },
  { key: "ColdCoffee", value: "Cold Coffee", icon: CupSoda },
  { key: "Maggi", value: "Maggi", icon: Soup },
  { key: "Sandwich", value: "Sandwich", icon: Sandwich },
  { key: "Burger", value: "Burger", icon: Utensils },
  { key: "FreshJuice", value: "FreshJuice", icon:Martini },
  { key: "Combos", value: "Combos", icon:Layers3 },

]

const predefinedMenuItems = {
  Tea: [
    { id: 'tea-1', name: "Chai Tea", price: "Small: ₹10", price2: "Large: ₹15", description: "Our signature chai tea blend.", category: "Tea" },
    { id: 'tea-2', name: "Elaichi Tea", price: "Small: ₹15", price2: "Large: ₹20", description: "Aromatic cardamom tea.", category: "Tea" },
    { id: 'tea-3', name: "Masala Tea", price: "Small: ₹15", price2: "Large: ₹20", description: "Spiced masala tea.", category: "Tea" },
    { id: 'tea-4', name: "Ginger Tea", price: "Small: ₹15", price2: "Large: ₹20", description: "Refreshing ginger tea.", category: "Tea" },
    { id: 'tea-5', name: "Cinnamon Tea", price: "Small: ₹15", price2: "Large: ₹20", description: "Warm cinnamon tea.", category: "Tea" },
    { id: 'tea-6', name: "Lemon Tea", price: "Small: ₹15", price2: "Large: ₹20", description: "Zesty lemon tea.", category: "Tea" },
    { id: 'tea-7', name: "Ginger Lemon Tea", price: "Small: ₹15", price2: "Large: ₹20", description: "Ginger and lemon tea.", category: "Tea" }
  ,
    { id: 'tea-8', name: "Black Tea", price: "₹15", description: "Rich black tea.", category: "Tea" },
    { id: 'tea-9', name: "Green Tea", price: "₹15", description: "Healthy green tea.", category: "Tea" },
    { id: 'tea-10', name: "Kullad Tea", price: "₹30", description: "Traditional kullad tea.", category: "Tea" },
    { id: 'tea-11', name: "Kashmiri Kahwah", price: "₹30", description: "Healthy green tea.", category: "Tea" },
    { id: 'tea-12', name: "Kesar Elaichi", price: "₹30", description: "Traditional kullad tea.", category: "Tea" }
  ],
  Coffee: [
    { id: 'coffee-1', name: "Instant Coffee", price: "Small: ₹15", price2: "Large: ₹20", description: "Quick and convenient instant coffee.", category: "Coffee" },
    { id: 'coffee-2', name: "Filter Coffee", price: "Small: ₹15", price2: "Large: ₹20", description: "Classic filter coffee.", category: "Coffee" },
    { id: 'coffee-3', name: "Black Coffee", price: "₹15", description: "Strong black coffee.", category: "Coffee" }
  ],
  HotMilk: [
    { id: 'hotmilk-1', name: "Plain Milk", price: "₹15", description: "Fresh plain milk.", category: "HotMilk" },
    { id: 'hotmilk-2', name: "Turmeric Milk", price: "₹15", description: "Healthy turmeric milk.", category: "HotMilk" },
    { id: 'hotmilk-3', name: "Badam Milk", price: "₹20", description: "Nutty badam milk.", category: "HotMilk" },
    { id: 'hotmilk-4', name: "Bournvita / Horlicks", price: "₹20", description: "Chocolatey malt drink.", category: "HotMilk" },
    { id: 'hotmilk-5', name: "Hot Chocolate", price: "₹30", description: "Rich hot chocolate.", category: "HotMilk" },
    { id: 'hotmilk-6', name: "Boost", price: "₹20", description: "Nutritional drink.", category: "HotMilk" }
  ],
  Snacks: [
    { id: 'snacks-1', name: "Biscuit", price: "₹5", description: "Crunchy biscuit.", category: "Snacks" },
    { id: 'snacks-2', name: "Bun/Bread Butter", price: "₹30", description: "Buttered bun.", category: "Snacks" },
    { id: 'snacks-3', name: "Bun/Bread Jam", price: "₹30", description: "Bun with jam.", category: "Snacks" },
    { id: 'snacks-4', name: "Bun Maska", price: "₹45", description: "Bun with butter.", category: "Snacks" },
    { id: 'snacks-5', name: "French Fries", price: "₹70", description: "Crispy French fries.", category: "Snacks" },
    { id: 'snacks-6', name: "Peri Peri Fries", price: "₹80", description: "Spicy peri peri fries.", category: "Snacks" },
    { id: 'snacks-7', name: "Garlic POPS", price: "₹90", description: "Garlic-flavored pops.", category: "Snacks" },
    { id: 'snacks-8', name: "Bread Omlette", price: "₹35", description: "Omelette in bread.", category: "Snacks" },
    { id: 'snacks-9', name: "Bun Masala Omlette", price: "₹40", description: "Spiced omelette in bun.", category: "Snacks" },
    { id: 'snacks-10', name: "Chicken Nuggets", price: "₹90", description: "Crispy chicken nuggets.", category: "Snacks" },
    { id: 'snacks-11', name: "Chicken Wings", price: "₹100", description: "Crispy French fries.", category: "Snacks" },
    { id: 'snacks-12', name: "Chicken Poppcorn", price: "₹90", description: "Spicy peri peri fries.", category: "Snacks" },
    { id: 'snacks-13', name: "Veg Nuggets", price: "₹70", description: "Garlic-flavored pops.", category: "Snacks" },
    { id: 'snacks-14', name: "Potato Cheese Shorts", price: "₹60", description: "Omelette in bread.", category: "Snacks" }
  ],
  Milkshakes: [
    { id: 'milkshake-1', name: "Vanilla Shake", price: "₹60", description: "Creamy vanilla shake.", category: "Milkshakes" },
    { id: 'milkshake-2', name: "Banana Shake", price: "₹60", description: "Smooth banana shake.", category: "Milkshakes" },
    { id: 'milkshake-3', name: "Strawberry Shake", price: "₹60", description: "Fruity strawberry shake.", category: "Milkshakes" },
    { id: 'milkshake-4', name: "Belgian Chocolate Shake", price: "₹70", description: "Rich chocolate shake.", category: "Milkshakes" },
    { id: 'milkshake-5', name: "Oreo Shake", price: "₹70", description: "Oreo flavored shake.", category: "Milkshakes" },
    { id: 'milkshake-6', name: "Mango Shake", price: "₹70", description: "Refreshing mango shake.", category: "Milkshakes" },
    { id: 'milkshake-7', name: "Butterscotch Shake", price: "₹80", description: "Creamy butterscotch shake.", category: "Milkshakes" },
    { id: 'milkshake-8', name: "Dry Fruit Shake", price: "₹90", description: "Nutty dry fruit shake.", category: "Milkshakes" },
    { id: 'milkshake-9', name: "Brownie Shake", price: "₹90", description: "Delicious brownie shake.", category: "Milkshakes" },
    { id: 'milkshake-10', name: "Nutella Shake", price: "₹90", description: "Nutella flavored shake.", category: "Milkshakes" },
    { id: 'milkshake-11', name: "Ferrero Rocher Shake", price: "₹90", description: "Nutella flavored shake.", category: "Milkshakes" }

  ],
  Lemonades: [
    { id: 'lemonade-1', name: "Lime Juice", price: "₹20", description: "Fresh lime juice.", category: "Lemonades" },
    { id: 'lemonade-2', name: "Lime Soda", price: "₹30", description: "Refreshing lime soda.", category: "Lemonades" },
    { id: 'lemonade-3', name: "Masala Soda", price: "₹35", description: "Spicy masala soda.", category: "Lemonades" },
    { id: 'lemonade-4', name: "Blue Lime", price: "₹60", description: "Blue lime drink.", category: "Lemonades" },
    { id: 'lemonade-5', name: "Strawberry Lemonade", price: "₹60", description: "Sweet strawberry lemonade.", category: "Lemonades" },
    { id: 'lemonade-6', name: "Virgin Mojito", price: "₹70", description: "Refreshing virgin mojito.", category: "Lemonades" },
    { id: 'lemonade-7', name: "Mango Mojito", price: "₹80", description: "Tropical mango mojito.", category: "Lemonades" }
  ],
  SummerChills : [
    { id: 'summerchill-1', name: "Buttermilk", price: "₹20", description: "Refreshing buttermilk.", category: "SummerChills" },
    { id: 'summerchill-2', name: "Rose Milk", price: "₹40", description: "Sweet rose milk.", category: "SummerChills" },
    { id: 'summerchill-3', name: "Badam Milk", price: "₹40", description: "Nutty badam milk.", category: "SummerChills" },
    { id: 'summerchill-4', name: "Sweet Lassi", price: "₹60", description: "Delicious sweet lassi.", category: "SummerChills" },
    { id: 'summerchill-5', name: "Kesar Badam Lassi", price: "₹60", description: "Saffron badam lassi.", category: "SummerChills" },
    { id: 'summerchill-6', name: "Lemon Iced Tea", price: "₹60", description: "Iced lemon tea.", category: "SummerChills" },
    { id: 'summerchill-7', name: "Peach Iced Tea", price: "₹70", description: "Peach flavored iced tea.", category: "SummerChills" },
    { id: 'summerchill-8', name: "Blueberry Iced Tea", price: "₹80", description: "Blueberry iced tea.", category: "SummerChills" },
    { id: 'summerchill-9', name: "Very Berry Smoothie", price: "₹80", description: "Berry smoothie.", category: "SummerChills" },
    { id: 'summerchill-10', name: "Kiwi Smoothie", price: "₹90", description: "Kiwi smoothie.", category: "SummerChills" },
    { id: 'summerchill-11', name: "Nutella Banana Smoothie", price: "₹90", description: "Berry smoothie.", category: "SummerChills" },
    { id: 'summerchill-12', name: "Death By Chocolate", price: "₹100", description: "Kiwi smoothie.", category: "SummerChills" }
  ],
  
  ColdCoffee : [
    { id: 'coldcoffee-1', name: "Classic Cold Coffee", price: "₹60", description: "Classic cold coffee.", category: "ColdCoffee" },
    { id: 'coldcoffee-2', name: "Caramel Coffee", price: "₹70", description: "Sweet caramel coffee.", category: "ColdCoffee" },
    { id: 'coldcoffee-3', name: "Belgian Coffee", price: "₹70", description: "Rich Belgian coffee.", category: "ColdCoffee" },
    { id: 'coldcoffee-4', name: "Kitkat Coffee", price: "₹80", description: "Delicious Kitkat coffee.", category: "ColdCoffee" },
    { id: 'coldcoffee-5', name: "Italian Coffee", price: "₹80", description: "Authentic Italian coffee.", category: "ColdCoffee" }
  ],
  
  Maggi : [
    { id: 'maggi-1', name: "Plain Maggi", price: "₹35", description: "Simple and classic maggi.", category: "Maggi" },
    { id: 'maggi-2', name: "Veg Maggi", price: "₹45", description: "Veggie-loaded maggi.", category: "Maggi" },
    { id: 'maggi-3', name: "Cheese Maggi", price: "₹60", description: "Cheesy maggi.", category: "Maggi" },
    { id: 'maggi-4', name: "Paneer Maggi", price: "₹60", description: "Paneer maggi.", category: "Maggi" },
    { id: 'maggi-5', name: "Egg/Chicken Maggi", price: "₹50/75", description: "Maggi with egg or chicken.", category: "Maggi" }
  ],
  
  Sandwich : [
    { id: 'sandwich-1', name: "Vegetable Grill", price: "₹60", description: "Grilled vegetable sandwich.", category: "Sandwich" },
    { id: 'sandwich-2', name: "Schezwan Grill", price: "₹70", description: "Spicy schezwan grilled sandwich.", category: "Sandwich" },
    { id: 'sandwich-3', name: "Peri Peri Grill", price: "₹70", description: "Peri peri grilled sandwich.", category: "Sandwich" },
    { id: 'sandwich-4', name: "Cheese Chilli Grill", price: "₹80", description: "Cheese and chili grilled sandwich.", category: "Sandwich" },
    { id: 'sandwich-5', name: "Paneer Grill", price: "₹80", description: "Grilled paneer sandwich.", category: "Sandwich" },
    { id: 'sandwich-6', name: "Corn and Cheese Grill", price: "₹80", description: "Corn and cheese grilled sandwich.", category: "Sandwich" },
    { id: 'sandwich-7', name: "Egg/Chicken Grill", price: "₹60/85", description: "Grilled egg or chicken sandwich.", category: "Sandwich" }
  ],
  
  Burger: [
    { id: 'burger-1', name: "Aloo Tikki Burger", price: "₹60", description: "Aloo tikki burger.", category: "Burger" },
    { id: 'burger-2', name: "Vegetable Burger", price: "₹75", description: "Vegetarian burger.", category: "Burger" },
    { id: 'burger-3', name: "Paneer Burger", price: "₹95", description: "Paneer tikka burger.", category: "Burger" },
    { id: 'burger-4', name: "Panner Grill Burger", price: "₹85", description: "Delicious chicken burger.", category: "Burger" },
    { id: 'burger-5', name: "Chicken Grill Burger", price: "₹90", description: "Cheesy burger.", category: "Burger" },
    { id: 'burger-6', name: "Extra Cheese", price: "Extra Cheese/₹15", description: "Egg burger.", category: "Burger" }
  ]
};



const allMenuItems = Object.values(predefinedMenuItems).flat()

const emojisList = ['🍵', '🍽️', '👨‍🍳', '🍰', '🍝', '🍕', '🍣', '🍔', '🍹', '🥗']

const dailySpecials = [
  { day: "Monday", item: "Classic Cheeseburger", category: "Burger" },
  { day: "Tuesday", item: "Grilled Chicken Sandwich", category: "Sandwich" },
  { day: "Wednesday", item: "Veggie Burger", category: "Burger" },
  { day: "Thursday", item: "Turkey Club Sandwich", category: "Sandwich" },
  { day: "Friday", item: "Fish Burger", category: "Burger" },
  { day: "Saturday", item: "BLT Sandwich", category: "Sandwich" },
  { day: "Sunday", item: "Deluxe Burger", category: "Burger" },
]

export function EnhancedRestaurantApp() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(categoriesArray[0].key)
  const [previousCategory, setPreviousCategory] = useState(categoriesArray[0].key)
  const [showGame, setShowGame] = useState(false)
  const [gameEmojis, setGameEmojis] = useState<string[]>([])
  const [clickedEmojis, setClickedEmojis] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const cardRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showAll, setShowAll] = useState(false)

  const x = useMotionValue(0)
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

  useEffect(() => {
    resetGame()
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    if(favorites.length >0){
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  const resetGame = useCallback(() => {
    setGameEmojis(shuffleArray(emojisList.slice(0, 5)))
    setClickedEmojis([])
    setScore(0)
    setGameStatus('playing')
  }, [])

  const handleEmojiClick = useCallback((emoji: string) => {
    if (clickedEmojis.includes(emoji)) {
      setGameStatus('lost')
    } else {
      const newClickedEmojis = [...clickedEmojis, emoji]
      setClickedEmojis(newClickedEmojis)
      setScore(newClickedEmojis.length)
      if (newClickedEmojis.length === gameEmojis.length) {
        setGameStatus('won')
      } else {
        setGameEmojis(shuffleArray([...gameEmojis]))
      }
    }
  }, [clickedEmojis, gameEmojis])

  const handleAdvancedGame = useCallback(() => {
    setGameEmojis(shuffleArray(emojisList))
    setClickedEmojis([])
    setScore(0)
    setGameStatus('playing')
  }, [])

  const handleFavorite = useCallback((itemId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
      
      if (newFavorites.length === 0 && showFavorites) {
        setShowFavorites(false)
        setSelectedCategory(previousCategory)
      }
      
      return newFavorites
    })
  }, [showFavorites, previousCategory])

  useEffect(()=>{
  },[selectedCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setPreviousCategory(category)
    setSelectedCategory(category)
    setShowAll(false)

    setSearchTerm('')
    if (showFavorites) {
      setShowFavorites(false)
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [selectedCategory, showFavorites])

  const handleDragEnd = useCallback((event: any, info: any) => {
    if (info.offset.x > 100) {
      const currentIndex = categoriesArray.findIndex(cat => cat.key === selectedCategory)
      const nextIndex = (currentIndex - 1 + categoriesArray.length) % categoriesArray.length
      handleCategoryChange(categoriesArray[nextIndex].key)
    } else if (info.offset.x < -100) {
      const currentIndex = categoriesArray.findIndex(cat => cat.key === selectedCategory)
      const nextIndex = (currentIndex + 1) % categoriesArray.length
      handleCategoryChange(categoriesArray[nextIndex].key)
    }
  }, [selectedCategory, handleCategoryChange])

  const getCurrentDaySpecial = useCallback(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDay = days[new Date().getDay()]
    return dailySpecials.find(special => special.day === currentDay)
  }, [])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)
    if (newSearchTerm === '') {
      setSelectedCategory(previousCategory)
    } else {
      //setPreviousCategory(selectedCategory)
      setSelectedCategory('')
    }
    setShowFavorites(false)
  }, [previousCategory, selectedCategory])

  const handleClearSearch = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory(previousCategory)
  }, [previousCategory])

  const filteredItems = useMemo(() => {
    const searchLower = searchTerm.toLowerCase()
    if (searchTerm) {
      return allMenuItems.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
      )
    }
    if (showFavorites) {
      return allMenuItems.filter(item => favorites.includes(item.id))
    }
    return predefinedMenuItems[selectedCategory]  || [] 
  }, [searchTerm, showFavorites, selectedCategory, favorites])


  const currentCategory = categoriesArray.find(cat => cat.key === selectedCategory);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F3F8] to-[#F0F8FF] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-[60px] shadow-2xl p-6 relative overflow-hidden" style={{ height: '932px', width: '430px' }}>
        <div className="flex items-center justify-between mb-6">
          <div className='flex justify-start items-end gap-0'>
          <Image
              src={compLgo}
              alt="comnpany of the image"
              width={125}
              height={100}
            />
            <p className='text-1xl -ml-3 -mb-1 font-primary font-extrabold text-[#007ABD]'>Vinayak Nagar</p>
          </div>
{/*           <h1 className="text-2xl font-bold text-[#007ABD]">{shopName}</h1>
 */}         
 <div className='flex flex-row justify-end items-center'>
 <a
      href="https://www.instagram.com/teaday_vinayakanagar/" // Replace with your Instagram URL
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <Image
  src={instaGram} // External image
  alt="instagram"
  width={30}
  height={20}
/>

          </a>
          <motion.div
            animate={{
              y: [0, -5, 0],
              transition: {
                y: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              },
            }}
            className="w-10 h-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#007ABD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8h1a4 4 0 110 8h-1"></path>
              <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
              <motion.path
                d="M 8 8 C 8 8 8 12 12 12 C 16 12 16 8 16 8"
                strokeDasharray="0 1"
                animate={{
                  strokeDasharray: ["0 1", "1 0"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>

 </div>
      
        </div>
        
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-[60px]"
            >
              <div className="text-center p-8 relative w-full max-w-md">
                <button 
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowWelcome(false)}
                >
                  <X size={24} />
                </button>
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Restaurant ambiance"
                  width={200}
                  height={200}
                  className="mx-auto mb-6 rounded-full shadow-lg"
                />
                <h2 className="text-3xl font-bold text-[#007ABD] mb-4">Welcome to {shopName}!</h2>
              
                <p className="text-xl text-gray-700 mb-6 italic">"Where every sip tells a story, and every bite is an adventure."</p>
                <div className="bg-[#E6F3F8] rounded-lg p-4 shadow-md">
                  <h3 className="text-2xl font-semibold text-[#007ABD] mb-2">Weekly Specials</h3>
                  <div className="space-y-2">
                    {dailySpecials.map((special, index) => (
                      <div key={index} className={`flex justify-between items-center ${getCurrentDaySpecial()?.day === special.day ? 'font-bold' : ''}`}>
                        <span>{special.day}:</span>
                        <span>{special.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-[#007ABD] text-white font-bold py-2 px-2 rounded-full shadow-lg flex items-center ${showFavorites ? 'bg-opacity-80' : ''}`}
            onClick={() => {
              setShowFavorites(!showFavorites)
              setSearchTerm('')
              if (!showFavorites) {
                setPreviousCategory(selectedCategory)
                setSelectedCategory('')
              } else {
                setSelectedCategory(previousCategory)
              }
            }}
          >
            <Heart size={20} className="mr-2" fill={showFavorites ? '#FFF' : 'none'} />
            {showFavorites ? 'All' : 'Favorites'}
          </motion.button>
          <div className=" relative">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-3 py-2 pl-10 pr-8 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-[#007ABD]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
    
        </div>

       

    <div className="flex flex-wrap justify-center mb-4 !overflow-x-auto max-w-fit max-h-full bg-gray-100 rounded-lg p-2">
{/*     <div className="overflow-hidden whitespace-nowrap">
      <div
        className="flex space-x-4 p-4"
        ref={scrollContainerRef}
      >
        {[...categoriesArray, ...categoriesArray].map(({ key, value, icon: Icon }) => (
          <button
            key={key}
            className="flex items-center space-x-2 p-2 rounded-md bg-white text-black hover:bg-gray-200 transition"
          >
            <Icon className="w-6 h-6" />
            <span>{value}</span>
          </button>
        ))}
      </div>
    </div> */}
  {categoriesArray.map((category, index) => {
    // Conditional rendering logic
    if (!showAll ? (index >4 ? false:true) : true) {
    return (
      <motion.button
        key={category.key}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`m-1 px-3 py-2 rounded-full text-sm flex items-center ${
          selectedCategory === category.key ? 'bg-[#007ABD] text-white' : 'bg-white text-gray-700'
        } shadow-sm transition-all duration-200 ease-in-out`}
        onClick={() => handleCategoryChange(category.key)}
      >
        {category.icon && <category.icon size={16} className="mr-2" />}
        {category.value}
      </motion.button>
    );
  }
  })}
   {/* Show "View All" button if there are more categories */}
   {categoriesArray.length > 5 && !showAll && (
        <button
          className="m-1 px-3 py-2 rounded-full text-sm bg-green-400 text-gray-700 shadow-sm transition-all duration-200 ease-in-out"
          onClick={() => setShowAll(true)}
        >
          View All
        </button>
      )}

      {/* Show "Show Less" button if in expanded mode */}
      {showAll && (
        <button
          className="m-1 px-3 py-2 rounded-full text-sm bg-orange-300 text-gray-700 shadow-sm transition-all duration-200 ease-in-out"
          onClick={() => setShowAll(false)}
        >
          Show Less
        </button>
      )}
</div>


        <motion.div
          ref={cardRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="mb-4 overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ height: 'calc(100% - 380px)', x, opacity } }
        >
          <div className="bg-[#E6F3F8] rounded-lg overflow-hidden shadow-md h-full">
          <div className='flex justify-start items-center'>
      <h2 className="text-2xl font-bold text-[#007ABD] p-4 sticky top-0 bg-[#E6F3F8] z-10">
        {showFavorites 
          ? 'Favorites' 
          : searchTerm 
          ? 'Search Results' 
          : currentCategory?.value}
      </h2>
      {currentCategory?.icon && (
        <currentCategory.icon size={30} className="mr-2 text-[#007ABD]" />
      )}
    </div>
            <div ref={scrollContainerRef} className="space-y-4 p-4 overflow-y-auto h-full">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                   /*  initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }} */
                    className={`bg-white rounded-lg p-2 shadow-sm ${filteredItems.length == index +1 && '!mb-[75px]'}` }
                  >
                    <div className="flex justify-between items-center">
                      <div className={`flex justify-between  items-center ${(item.category === "Tea" || item.category === "Coffee") ? "min-w-[60%]": "min-w-[80%]" }`}>
                      <h3 className="text-lg font-semibold text-gray-800">{(item.category === "Burger" && item.id === "burger-6")?item.price :item.name}</h3>
                      {!(item.category === "Burger" && item.id === "burger-6") &&   <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-${favorites.includes(item.id) ? 'pink-500' : '[#007ABD]'}`}
                        onClick={() => handleFavorite(item.id)}
                      >
                        <Heart size={20} fill={favorites.includes(item.id) ? '#FF69B4' : 'none'} />
                      </motion.button>}
                      </div>
                      <div className='flex flex-col justify-end items-end'>
                      {!(item.category === "Burger" && item.id === "burger-6") && <p className="text-[#007ABD] items-end font-semibold">{item.price}</p>}
                      {!(item.category === "Burger" && item.id === "burger-6") && <p className="text-[#007ABD] items-end font-semibold">{item.price2}</p>}

                      </div>

                    </div>
                     
                    {/* <p className="text-gray-600 text-sm mt-1">{item.description}</p> */}
                    {(searchTerm || showFavorites) && <p className="text-gray-500 text-sm mt-1">Category: {item.category}</p>}
                  </div>
                ))
              ) : (
                (selectedCategory === "Combos" || selectedCategory === "FreshJuice") ?
                (<p>Menu updates are coming soon, and you can find this item near the counter.
                  </p>):
                (<div className="text-center text-gray-500 mt-8">
                  <p className="text-xl font-semibold">No items found</p>
                  <p className="mt-2">Try adjusting your search or category selection</p>
                </div>)
              )}
            </div>
          </div>
        </motion.div>

        <div className="text-center absolute bottom-6 left-0 right-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#007ABD] text-white font-bold py-2 px-4 rounded-full shadow-lg"
            onClick={() => setShowGame(true)}
          >
            Play a game while you wait!
          </motion.button>
        </div>

        <AnimatePresence>
          {showGame && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
            >
              <div className="bg-white p-6 rounded-2xl max-w-sm w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#007ABD]">Quick Emoji Match</h2>
                  <button onClick={() => setShowGame(false)}>
                    <X className="text-gray-500" />
                  </button>
                </div>
                {gameStatus === 'playing' && (
                  <>
                    <p className="text-lg mb-4">Score: {score} / {gameEmojis.length}</p>
                    <div className="grid grid-cols-5 gap-4 mb-4">
                      {gameEmojis.map((emoji, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-4xl bg-[#E6F3F8] rounded-lg p-2 shadow-md"
                          onClick={() => handleEmojiClick(emoji)}
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 text-center">Click each emoji once to win!</p>
                  </>
                )}
                {gameStatus === 'won' && (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-500 mb-4">Congratulations!</h3>
                    <p className="text-lg mb-4">
                      {gameEmojis.length === 5 
                        ? "You've matched all 5 emojis!"
                        : "You've matched all 10 emojis! You're a pro!"}
                    </p>
                    {gameEmojis.length === 5 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#007ABD] text-white font-bold py-2 px-4 rounded-full shadow-lg mb-2"
                        onClick={handleAdvancedGame}
                      >
                        Try 10 Emoji Challenge
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full shadow-lg"
                      onClick={() => setShowGame(false)}
                    >
                      Close
                    </motion.button>
                  </div>
                )}
                {gameStatus === 'lost' && (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-red-500 mb-4">Game Over</h3>
                    <p className="text-lg mb-4">You clicked the same emoji twice!</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#007ABD] text-white font-bold py-2 px-4 rounded-full shadow-lg"
                      onClick={resetGame}
                    >
                      Try Again
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}