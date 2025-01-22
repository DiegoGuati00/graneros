import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

const SliderThumbnails = ({galeria=[]}) => {
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
      })
      const [thumbnailRef] = useKeenSlider(
        {
          initial: 0,
          slides: {
            perView: 4,
            spacing: 10,
          },
        },
        [ThumbnailPlugin(instanceRef)]
      )
    
      return (
        <>
          <div ref={sliderRef} className="keen-slider">
            {
                galeria.map((img,i)=>{
                    setTimeout(() => {
                        instanceRef.current.update()
                        
                    }, 400);
                    let a = img;
                    a = a.replaceAll("[","")
                    a = a.replaceAll("]","")
                    a = a.replaceAll("\"","")
                    a = a.replaceAll("\\","")
                    console.log(a)
                    return <div key={"a"+i} className="keen-slider__slide">
                        <img src={a} alt="" />
                    </div>
                })
            }
          </div>
    
          <div ref={thumbnailRef} className="keen-slider thumbnail">
            {
                galeria.map((img,i)=>{
                    let a = img;
                    a = a.replaceAll("[","")
                    a = a.replaceAll("]","")
                    a = a.replaceAll("\"","")
                    a = a.replaceAll("\\","")
                    return <div key={"h"+i} className="keen-slider__slide">
                        <img src={a} alt="" />
                    </div>
                })
            }
          </div>
        </>
      )
}

export default SliderThumbnails;
