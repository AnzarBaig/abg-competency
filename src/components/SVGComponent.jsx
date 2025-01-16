import React, { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { Badge } from "@/components/ui/badge";
import competency from "@/components/competency.json";

const SVGComponent = ({ props: behaviors, colors }) => {
  const data = competency.competencyFramework;

  const primaryColor = colors?.primary || "#AB1F24";
  const secondaryColor = colors?.secondary || "#FFF4F4";
  const defaultBand = "";

  const selectedTitle = useStore();
  const [selectedBand, setSelectedBand] = useState(null);
  const [height, setHeight] = useState(null);
  const [jbPoints, setJbPoints] = useState([]);

  useEffect(() => {
    if (behaviors && behaviors.some((b) => b.jobBand === defaultBand)) {
      setSelectedBand(defaultBand);
    }
  }, [behaviors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerWidth > 768 ? "50vh" : "auto");
    }
  }, []);

  const fillColor = (jobBand) => {
    if (behaviors && selectedBand === jobBand) return "white";
    if (!behaviors && jbPoints.length > 0 && jbPoints[0].jobBand === jobBand)
      return "white";
    return "black";
  };
  const getFillColor = (jobBand) => {
    if (!behaviors) {
      // Check if the jobBand matches jbPoints when no behaviors are present
      if (jbPoints.length > 0 && jbPoints[0].jobBand === jobBand) {
        return primaryColor;
      }
      return secondaryColor;
    }
    const isBandInProps = behaviors.some((b) => b.jobBand === jobBand);
    if (selectedBand === jobBand && isBandInProps) {
      return primaryColor;
    }
    return secondaryColor;
  };

  const getBehaviorByBand = (jobBand) => {
    if (!behaviors) return null;
    return behaviors.find((b) => b.jobBand === jobBand);
  };

  const getBehaviorsByBand = (jobBand) => {
    const selectedCompetency = data.find(
      (competency) =>
        competency.competencyName === selectedTitle.selectedCompetency
    );

    if (!selectedCompetency) return [];

    // Flatten all behaviors that match the job band
    const behaviors = selectedCompetency.competencyPoints.reduce(
      (acc, point) => {
        const matchingBehavior = point.behaviors.find(
          (b) => b.jobBand === jobBand
        );
        if (matchingBehavior) {
          acc.push(matchingBehavior);
        }
        return acc;
      },
      []
    );

    return behaviors;
  };

  const handlePathClick = (jobBand) => {
    if (getBehaviorByBand(jobBand)) {
      setSelectedBand((prevBand) =>
        prevBand === jobBand ? defaultBand : jobBand
      );
    } else {
      setJbPoints((prevPoints) =>
        prevPoints.length > 0 && prevPoints[0].jobBand === jobBand
          ? []
          : getBehaviorsByBand(jobBand)
      );
    }
  };

  return (
    <div
      className={`relative flex md:flex-row flex-col md:items-start items-center ${
        selectedTitle.selectedTitle ? "justify-between" : "justify-center"
      }`}
    >
      <div className="relative md:mb-0 mb-4">
        <svg
          style={{
            width: "50vw",
            height: height,
          }}
          viewBox="0 0 700 688"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* JB 9-11 */}
          <path
            d="M699.167 687.5H0.832553L64.1727 568.5H635.827L699.167 687.5Z"
            fill={getFillColor("JB 9-11")}
            stroke={primaryColor}
            onClick={() => handlePathClick("JB 9-11")}
            style={{ cursor: "pointer" }}
          />

          {/* JB 6-8 */}
          <path
            d="M629.167 553.5H70.8326L134.182 434.5H565.818L629.167 553.5Z"
            fill={getFillColor("JB 6-8")}
            stroke={primaryColor}
            onClick={() => handlePathClick("JB 6-8")}
            style={{ cursor: "pointer" }}
          />

          {/* JB 4-5 */}
          <path
            d="M559.168 419.5H141.832L205.022 300.5H495.978L559.168 419.5Z"
            fill={getFillColor("JB 4-5")}
            stroke={primaryColor}
            onClick={() => handlePathClick("JB 4-5")}
            style={{ cursor: "pointer" }}
          />

          {/* JB 1-3 */}
          <path
            d="M489.167 285.5H210.833L274.172 166.5H425.828L489.167 285.5Z"
            fill={getFillColor("JB 1-3")}
            stroke={primaryColor}
            onClick={() => handlePathClick("JB 1-3")}
            style={{ cursor: "pointer" }}
          />

          {/* BD-BH/Exec */}
          <path
            d="M280.781 151.5L350 1.19532L419.219 151.5H280.781Z"
            fill={getFillColor("BD-BH/Exec")}
            stroke={primaryColor}
            onClick={() => handlePathClick("BD-BH/Exec")}
            style={{ cursor: "pointer" }}
          />

          <path
            d="M319.744 108V93.4545H325.071C326.103 93.4545 326.958 93.625 327.635 93.9659C328.312 94.3021 328.819 94.759 329.155 95.3366C329.491 95.9096 329.659 96.5559 329.659 97.2756C329.659 97.8816 329.548 98.393 329.325 98.8097C329.103 99.2216 328.805 99.553 328.431 99.804C328.061 100.05 327.654 100.23 327.209 100.344V100.486C327.692 100.509 328.163 100.666 328.622 100.955C329.086 101.239 329.47 101.643 329.773 102.169C330.076 102.695 330.227 103.334 330.227 104.087C330.227 104.83 330.052 105.498 329.702 106.089C329.356 106.677 328.821 107.143 328.097 107.489C327.372 107.83 326.447 108 325.32 108H319.744ZM321.939 106.118H325.107C326.158 106.118 326.911 105.914 327.365 105.507C327.82 105.1 328.047 104.591 328.047 103.98C328.047 103.521 327.931 103.099 327.699 102.716C327.467 102.332 327.136 102.027 326.705 101.8C326.279 101.572 325.772 101.459 325.185 101.459H321.939V106.118ZM321.939 99.7472H324.879C325.372 99.7472 325.815 99.6525 326.208 99.4631C326.605 99.2737 326.92 99.0085 327.152 98.6676C327.389 98.322 327.507 97.9148 327.507 97.446C327.507 96.8447 327.297 96.3404 326.875 95.9332C326.454 95.526 325.807 95.3224 324.936 95.3224H321.939V99.7472ZM337.539 108H332.83V93.4545H337.688C339.114 93.4545 340.338 93.7457 341.36 94.3281C342.383 94.9058 343.167 95.7367 343.711 96.821C344.26 97.9006 344.535 99.1955 344.535 100.706C344.535 102.221 344.258 103.523 343.704 104.612C343.155 105.701 342.359 106.539 341.318 107.126C340.276 107.709 339.017 108 337.539 108ZM335.025 106.082H337.419C338.526 106.082 339.447 105.874 340.181 105.457C340.915 105.036 341.464 104.428 341.829 103.632C342.194 102.832 342.376 101.857 342.376 100.706C342.376 99.5649 342.194 98.5966 341.829 97.8011C341.469 97.0057 340.932 96.402 340.217 95.9901C339.502 95.5781 338.614 95.3722 337.553 95.3722H335.025V106.082ZM353.521 99.804V101.651H347.072V99.804H353.521ZM356.522 108V93.4545H361.849C362.881 93.4545 363.735 93.625 364.412 93.9659C365.09 94.3021 365.596 94.759 365.932 95.3366C366.269 95.9096 366.437 96.5559 366.437 97.2756C366.437 97.8816 366.325 98.393 366.103 98.8097C365.88 99.2216 365.582 99.553 365.208 99.804C364.839 100.05 364.431 100.23 363.986 100.344V100.486C364.469 100.509 364.94 100.666 365.4 100.955C365.864 101.239 366.247 101.643 366.55 102.169C366.853 102.695 367.005 103.334 367.005 104.087C367.005 104.83 366.83 105.498 366.479 106.089C366.134 106.677 365.599 107.143 364.874 107.489C364.15 107.83 363.224 108 362.097 108H356.522ZM358.716 106.118H361.884C362.935 106.118 363.688 105.914 364.143 105.507C364.597 105.1 364.824 104.591 364.824 103.98C364.824 103.521 364.708 103.099 364.476 102.716C364.244 102.332 363.913 102.027 363.482 101.8C363.056 101.572 362.549 101.459 361.962 101.459H358.716V106.118ZM358.716 99.7472H361.657C362.149 99.7472 362.592 99.6525 362.985 99.4631C363.383 99.2737 363.698 99.0085 363.93 98.6676C364.166 98.322 364.285 97.9148 364.285 97.446C364.285 96.8447 364.074 96.3404 363.653 95.9332C363.231 95.526 362.585 95.3224 361.714 95.3224H358.716V99.7472ZM369.608 108V93.4545H371.802V99.7756H379.054V93.4545H381.256V108H379.054V101.658H371.802V108H369.608Z"
            fill={fillColor("BD-BH/Exec")}
          />
          <path
            d="M326.841 219.455H329.029V229.767C329.029 230.7 328.844 231.498 328.475 232.161C328.11 232.823 327.596 233.33 326.934 233.68C326.271 234.026 325.494 234.199 324.604 234.199C323.785 234.199 323.049 234.05 322.395 233.751C321.747 233.453 321.233 233.02 320.854 232.452C320.48 231.879 320.293 231.183 320.293 230.364H322.473C322.473 230.766 322.566 231.114 322.75 231.408C322.94 231.701 323.198 231.931 323.525 232.097C323.856 232.258 324.235 232.338 324.661 232.338C325.125 232.338 325.518 232.241 325.84 232.047C326.167 231.848 326.415 231.557 326.586 231.173C326.756 230.79 326.841 230.321 326.841 229.767V219.455ZM332.223 234V219.455H337.55C338.582 219.455 339.437 219.625 340.114 219.966C340.791 220.302 341.297 220.759 341.634 221.337C341.97 221.91 342.138 222.556 342.138 223.276C342.138 223.882 342.027 224.393 341.804 224.81C341.581 225.222 341.283 225.553 340.909 225.804C340.54 226.05 340.133 226.23 339.688 226.344V226.486C340.17 226.509 340.642 226.666 341.101 226.955C341.565 227.239 341.948 227.643 342.251 228.169C342.554 228.695 342.706 229.334 342.706 230.087C342.706 230.83 342.531 231.498 342.18 232.089C341.835 232.677 341.3 233.143 340.575 233.489C339.851 233.83 338.925 234 337.798 234H332.223ZM334.418 232.118H337.585C338.636 232.118 339.389 231.914 339.844 231.507C340.298 231.1 340.526 230.591 340.526 229.98C340.526 229.521 340.41 229.099 340.178 228.716C339.946 228.332 339.614 228.027 339.183 227.8C338.757 227.572 338.25 227.459 337.663 227.459H334.418V232.118ZM334.418 225.747H337.358C337.85 225.747 338.293 225.652 338.686 225.463C339.084 225.274 339.399 225.009 339.631 224.668C339.867 224.322 339.986 223.915 339.986 223.446C339.986 222.845 339.775 222.34 339.354 221.933C338.932 221.526 338.286 221.322 337.415 221.322H334.418V225.747ZM355.922 219.455V234H353.72V221.656H353.635L350.154 223.929V221.827L353.784 219.455H355.922ZM366.312 225.804V227.651H359.863V225.804H366.312ZM373.983 234.199C373.007 234.199 372.136 234.031 371.369 233.695C370.607 233.358 370.003 232.892 369.558 232.295C369.118 231.694 368.881 230.998 368.848 230.207H371.078C371.106 230.638 371.251 231.012 371.511 231.33C371.776 231.642 372.122 231.884 372.548 232.054C372.974 232.224 373.448 232.31 373.968 232.31C374.541 232.31 375.048 232.21 375.488 232.011C375.933 231.812 376.281 231.536 376.532 231.18C376.783 230.821 376.909 230.406 376.909 229.938C376.909 229.45 376.783 229.021 376.532 228.652C376.286 228.278 375.924 227.984 375.446 227.771C374.972 227.558 374.399 227.452 373.727 227.452H372.498V225.662H373.727C374.267 225.662 374.74 225.565 375.147 225.371C375.559 225.177 375.881 224.907 376.113 224.561C376.345 224.211 376.461 223.801 376.461 223.332C376.461 222.883 376.359 222.492 376.156 222.161C375.957 221.824 375.673 221.562 375.304 221.372C374.939 221.183 374.508 221.088 374.011 221.088C373.538 221.088 373.095 221.176 372.683 221.351C372.276 221.521 371.944 221.768 371.689 222.089C371.433 222.407 371.296 222.788 371.277 223.233H369.153C369.177 222.447 369.409 221.756 369.849 221.159C370.294 220.562 370.881 220.096 371.61 219.76C372.34 219.424 373.149 219.256 374.039 219.256C374.972 219.256 375.777 219.438 376.454 219.803C377.136 220.162 377.662 220.643 378.031 221.244C378.405 221.846 378.59 222.504 378.585 223.219C378.59 224.033 378.362 224.724 377.903 225.293C377.449 225.861 376.842 226.242 376.085 226.436V226.55C377.051 226.696 377.799 227.08 378.329 227.7C378.864 228.321 379.129 229.09 379.125 230.009C379.129 230.809 378.907 231.526 378.457 232.161C378.012 232.795 377.404 233.295 376.632 233.659C375.86 234.019 374.977 234.199 373.983 234.199Z"
            fill={fillColor("JB 1-3")}
          />
          <path
            d="M325.74 487.455H327.927V497.767C327.927 498.7 327.743 499.498 327.373 500.161C327.009 500.823 326.495 501.33 325.832 501.68C325.169 502.026 324.393 502.199 323.502 502.199C322.683 502.199 321.947 502.05 321.294 501.751C320.645 501.453 320.131 501.02 319.752 500.452C319.378 499.879 319.191 499.183 319.191 498.364H321.372C321.372 498.766 321.464 499.114 321.649 499.408C321.838 499.701 322.096 499.931 322.423 500.097C322.754 500.258 323.133 500.338 323.559 500.338C324.023 500.338 324.416 500.241 324.738 500.047C325.065 499.848 325.314 499.557 325.484 499.173C325.654 498.79 325.74 498.321 325.74 497.767V487.455ZM331.121 502V487.455H336.448C337.48 487.455 338.335 487.625 339.012 487.966C339.689 488.302 340.196 488.759 340.532 489.337C340.868 489.91 341.036 490.556 341.036 491.276C341.036 491.882 340.925 492.393 340.702 492.81C340.48 493.222 340.182 493.553 339.808 493.804C339.438 494.05 339.031 494.23 338.586 494.344V494.486C339.069 494.509 339.54 494.666 339.999 494.955C340.463 495.239 340.847 495.643 341.15 496.169C341.453 496.695 341.604 497.334 341.604 498.087C341.604 498.83 341.429 499.498 341.079 500.089C340.733 500.677 340.198 501.143 339.474 501.489C338.749 501.83 337.824 502 336.697 502H331.121ZM333.316 500.118H336.484C337.535 500.118 338.288 499.914 338.742 499.507C339.197 499.1 339.424 498.591 339.424 497.98C339.424 497.521 339.308 497.099 339.076 496.716C338.844 496.332 338.513 496.027 338.082 495.8C337.656 495.572 337.149 495.459 336.562 495.459H333.316V500.118ZM333.316 493.747H336.256C336.749 493.747 337.192 493.652 337.585 493.463C337.982 493.274 338.297 493.009 338.529 492.668C338.766 492.322 338.884 491.915 338.884 491.446C338.884 490.845 338.674 490.34 338.252 489.933C337.831 489.526 337.184 489.322 336.313 489.322H333.316V493.747ZM354.38 502.199C353.731 502.189 353.092 502.071 352.462 501.844C351.837 501.616 351.269 501.238 350.757 500.707C350.246 500.177 349.837 499.464 349.529 498.57C349.226 497.675 349.074 496.557 349.074 495.217C349.074 493.948 349.2 492.821 349.451 491.837C349.706 490.852 350.073 490.021 350.551 489.344C351.03 488.662 351.607 488.143 352.284 487.788C352.962 487.433 353.721 487.256 354.564 487.256C355.431 487.256 356.2 487.426 356.873 487.767C357.545 488.108 358.089 488.579 358.506 489.18C358.927 489.782 359.195 490.466 359.309 491.233H357.142C356.996 490.627 356.704 490.132 356.269 489.749C355.833 489.365 355.265 489.173 354.564 489.173C353.499 489.173 352.668 489.637 352.071 490.565C351.48 491.493 351.181 492.784 351.176 494.436H351.283C351.534 494.024 351.842 493.674 352.206 493.385C352.576 493.091 352.988 492.866 353.442 492.71C353.901 492.549 354.384 492.469 354.891 492.469C355.734 492.469 356.496 492.675 357.178 493.087C357.864 493.494 358.411 494.057 358.819 494.777C359.226 495.497 359.429 496.321 359.429 497.249C359.429 498.177 359.219 499.017 358.797 499.77C358.381 500.523 357.793 501.119 357.036 501.56C356.278 501.995 355.393 502.208 354.38 502.199ZM354.373 500.352C354.931 500.352 355.431 500.215 355.871 499.94C356.311 499.666 356.659 499.296 356.915 498.832C357.171 498.368 357.299 497.85 357.299 497.277C357.299 496.718 357.173 496.209 356.922 495.75C356.676 495.291 356.335 494.926 355.9 494.656C355.469 494.386 354.976 494.251 354.422 494.251C354.001 494.251 353.61 494.332 353.25 494.493C352.895 494.654 352.583 494.876 352.313 495.161C352.043 495.445 351.83 495.771 351.674 496.141C351.522 496.505 351.446 496.891 351.446 497.298C351.446 497.843 351.572 498.347 351.823 498.811C352.078 499.275 352.426 499.649 352.867 499.933C353.312 500.213 353.814 500.352 354.373 500.352ZM368.472 493.804V495.651H362.023V493.804H368.472ZM376.189 502.199C375.171 502.199 374.271 502.024 373.49 501.673C372.714 501.323 372.105 500.84 371.665 500.224C371.224 499.609 371.007 498.908 371.011 498.122C371.007 497.507 371.132 496.941 371.388 496.425C371.648 495.904 372.001 495.471 372.446 495.125C372.891 494.775 373.388 494.552 373.938 494.457V494.372C373.213 494.197 372.633 493.809 372.197 493.207C371.762 492.606 371.546 491.915 371.551 491.134C371.546 490.39 371.743 489.727 372.141 489.145C372.543 488.558 373.095 488.096 373.795 487.76C374.496 487.424 375.294 487.256 376.189 487.256C377.074 487.256 377.865 487.426 378.561 487.767C379.262 488.103 379.813 488.565 380.216 489.152C380.618 489.734 380.822 490.395 380.827 491.134C380.822 491.915 380.599 492.606 380.159 493.207C379.719 493.809 379.146 494.197 378.44 494.372V494.457C378.985 494.552 379.475 494.775 379.911 495.125C380.351 495.471 380.701 495.904 380.962 496.425C381.227 496.941 381.362 497.507 381.366 498.122C381.362 498.908 381.139 499.609 380.699 500.224C380.259 500.84 379.648 501.323 378.866 501.673C378.09 502.024 377.197 502.199 376.189 502.199ZM376.189 500.402C376.79 500.402 377.311 500.303 377.751 500.104C378.192 499.9 378.533 499.618 378.774 499.259C379.016 498.894 379.139 498.468 379.143 497.98C379.139 497.473 379.006 497.026 378.746 496.638C378.49 496.25 378.142 495.944 377.702 495.722C377.261 495.499 376.757 495.388 376.189 495.388C375.616 495.388 375.107 495.499 374.662 495.722C374.217 495.944 373.866 496.25 373.611 496.638C373.355 497.026 373.23 497.473 373.234 497.98C373.23 498.468 373.346 498.894 373.582 499.259C373.824 499.618 374.167 499.9 374.612 500.104C375.057 500.303 375.583 500.402 376.189 500.402ZM376.189 493.634C376.672 493.634 377.1 493.536 377.474 493.342C377.848 493.148 378.142 492.878 378.355 492.533C378.573 492.187 378.684 491.782 378.689 491.318C378.684 490.864 378.575 490.466 378.362 490.125C378.154 489.784 377.863 489.521 377.489 489.337C377.115 489.147 376.681 489.053 376.189 489.053C375.687 489.053 375.247 489.147 374.868 489.337C374.494 489.521 374.203 489.784 373.994 490.125C373.786 490.466 373.684 490.864 373.689 491.318C373.684 491.782 373.788 492.187 374.001 492.533C374.214 492.878 374.508 493.148 374.882 493.342C375.261 493.536 375.696 493.634 376.189 493.634Z"
            fill={fillColor("JB 6-8")}
          />
          <path
            d="M322.105 621.455H324.292V631.767C324.292 632.7 324.108 633.498 323.738 634.161C323.374 634.823 322.86 635.33 322.197 635.68C321.534 636.026 320.758 636.199 319.868 636.199C319.049 636.199 318.312 636.05 317.659 635.751C317.01 635.453 316.497 635.02 316.118 634.452C315.744 633.879 315.557 633.183 315.557 632.364H317.737C317.737 632.766 317.829 633.114 318.014 633.408C318.203 633.701 318.461 633.931 318.788 634.097C319.12 634.258 319.498 634.338 319.925 634.338C320.389 634.338 320.782 634.241 321.104 634.047C321.43 633.848 321.679 633.557 321.849 633.173C322.02 632.79 322.105 632.321 322.105 631.767V621.455ZM327.487 636V621.455H332.813C333.846 621.455 334.7 621.625 335.377 621.966C336.054 622.302 336.561 622.759 336.897 623.337C337.233 623.91 337.401 624.556 337.401 625.276C337.401 625.882 337.29 626.393 337.068 626.81C336.845 627.222 336.547 627.553 336.173 627.804C335.803 628.05 335.396 628.23 334.951 628.344V628.486C335.434 628.509 335.905 628.666 336.365 628.955C336.829 629.239 337.212 629.643 337.515 630.169C337.818 630.695 337.97 631.334 337.97 632.087C337.97 632.83 337.794 633.498 337.444 634.089C337.098 634.677 336.563 635.143 335.839 635.489C335.115 635.83 334.189 636 333.062 636H327.487ZM329.681 634.118H332.849C333.9 634.118 334.653 633.914 335.107 633.507C335.562 633.1 335.789 632.591 335.789 631.98C335.789 631.521 335.673 631.099 335.441 630.716C335.209 630.332 334.878 630.027 334.447 629.8C334.021 629.572 333.514 629.459 332.927 629.459H329.681V634.118ZM329.681 627.747H332.622C333.114 627.747 333.557 627.652 333.95 627.463C334.347 627.274 334.662 627.009 334.894 626.668C335.131 626.322 335.249 625.915 335.249 625.446C335.249 624.845 335.039 624.34 334.617 623.933C334.196 623.526 333.55 623.322 332.678 623.322H329.681V627.747ZM350.503 621.256C351.152 621.26 351.791 621.379 352.421 621.611C353.051 621.843 353.619 622.222 354.126 622.747C354.637 623.273 355.044 623.983 355.347 624.878C355.655 625.768 355.811 626.876 355.816 628.202C355.816 629.475 355.688 630.609 355.432 631.604C355.177 632.593 354.81 633.429 354.331 634.111C353.858 634.793 353.283 635.311 352.606 635.666C351.929 636.021 351.166 636.199 350.319 636.199C349.452 636.199 348.683 636.028 348.01 635.688C347.338 635.347 346.791 634.875 346.37 634.274C345.948 633.668 345.686 632.972 345.581 632.186H347.748C347.89 632.811 348.179 633.318 348.614 633.706C349.055 634.089 349.623 634.281 350.319 634.281C351.384 634.281 352.215 633.817 352.812 632.889C353.408 631.956 353.709 630.654 353.714 628.983H353.6C353.354 629.39 353.046 629.741 352.677 630.034C352.312 630.328 351.903 630.555 351.448 630.716C350.993 630.877 350.508 630.957 349.992 630.957C349.154 630.957 348.392 630.751 347.705 630.339C347.019 629.928 346.472 629.362 346.064 628.642C345.657 627.922 345.454 627.101 345.454 626.178C345.454 625.259 345.662 624.426 346.079 623.678C346.5 622.929 347.087 622.338 347.84 621.902C348.598 621.462 349.485 621.246 350.503 621.256ZM350.51 623.102C349.956 623.102 349.457 623.24 349.012 623.514C348.572 623.784 348.224 624.151 347.968 624.615C347.712 625.074 347.584 625.586 347.584 626.149C347.584 626.713 347.707 627.224 347.954 627.683C348.205 628.138 348.546 628.5 348.976 628.77C349.412 629.035 349.909 629.168 350.468 629.168C350.885 629.168 351.273 629.087 351.633 628.926C351.992 628.765 352.307 628.543 352.577 628.259C352.847 627.97 353.058 627.643 353.209 627.278C353.361 626.914 353.437 626.53 353.437 626.128C353.437 625.593 353.309 625.096 353.053 624.636C352.802 624.177 352.456 623.808 352.016 623.528C351.576 623.244 351.074 623.102 350.51 623.102ZM364.838 627.804V629.651H358.389V627.804H364.838ZM373.158 621.455V636H370.956V623.656H370.871L367.391 625.929V623.827L371.02 621.455H373.158ZM382.611 621.455V636H380.409V623.656H380.324L376.844 625.929V623.827L380.473 621.455H382.611Z"
            fill={fillColor("JB 9-11")}
          />
          <path
            d="M325.671 353.455H327.859V363.767C327.859 364.7 327.674 365.498 327.305 366.161C326.94 366.823 326.427 367.33 325.764 367.68C325.101 368.026 324.324 368.199 323.434 368.199C322.615 368.199 321.879 368.05 321.225 367.751C320.577 367.453 320.063 367.02 319.684 366.452C319.31 365.879 319.123 365.183 319.123 364.364H321.303C321.303 364.766 321.396 365.114 321.58 365.408C321.77 365.701 322.028 365.931 322.355 366.097C322.686 366.258 323.065 366.338 323.491 366.338C323.955 366.338 324.348 366.241 324.67 366.047C324.997 365.848 325.245 365.557 325.416 365.173C325.586 364.79 325.671 364.321 325.671 363.767V353.455ZM331.053 368V353.455H336.38C337.412 353.455 338.267 353.625 338.944 353.966C339.621 354.302 340.127 354.759 340.464 355.337C340.8 355.91 340.968 356.556 340.968 357.276C340.968 357.882 340.857 358.393 340.634 358.81C340.412 359.222 340.113 359.553 339.739 359.804C339.37 360.05 338.963 360.23 338.518 360.344V360.486C339.001 360.509 339.472 360.666 339.931 360.955C340.395 361.239 340.778 361.643 341.081 362.169C341.385 362.695 341.536 363.334 341.536 364.087C341.536 364.83 341.361 365.498 341.01 366.089C340.665 366.677 340.13 367.143 339.405 367.489C338.681 367.83 337.755 368 336.628 368H331.053ZM333.248 366.118H336.415C337.466 366.118 338.219 365.914 338.674 365.507C339.128 365.1 339.356 364.591 339.356 363.98C339.356 363.521 339.24 363.099 339.008 362.716C338.776 362.332 338.444 362.027 338.013 361.8C337.587 361.572 337.081 361.459 336.493 361.459H333.248V366.118ZM333.248 359.747H336.188C336.68 359.747 337.123 359.652 337.516 359.463C337.914 359.274 338.229 359.009 338.461 358.668C338.698 358.322 338.816 357.915 338.816 357.446C338.816 356.845 338.605 356.34 338.184 355.933C337.762 355.526 337.116 355.322 336.245 355.322H333.248V359.747ZM348.928 365.159V363.384L355.213 353.455H356.612V356.068H355.725L351.229 363.185V363.298H359.844V365.159H348.928ZM355.824 368V364.619L355.838 363.81V353.455H357.919V368H355.824ZM368.775 359.804V361.651H362.326V359.804H368.775ZM376.378 368.199C375.488 368.199 374.688 368.028 373.977 367.688C373.272 367.342 372.709 366.868 372.287 366.267C371.866 365.666 371.641 364.979 371.612 364.207H373.743C373.795 364.832 374.072 365.346 374.574 365.749C375.076 366.151 375.677 366.352 376.378 366.352C376.937 366.352 377.432 366.224 377.862 365.969C378.298 365.708 378.639 365.351 378.885 364.896C379.136 364.442 379.262 363.923 379.262 363.341C379.262 362.749 379.134 362.221 378.878 361.757C378.622 361.293 378.27 360.929 377.82 360.663C377.375 360.398 376.863 360.263 376.286 360.259C375.845 360.259 375.403 360.334 374.958 360.486C374.512 360.637 374.153 360.836 373.878 361.082L371.868 360.784L372.685 353.455H380.682V355.337H374.51L374.048 359.406H374.134C374.418 359.132 374.794 358.902 375.263 358.717C375.736 358.533 376.243 358.44 376.783 358.44C377.668 358.44 378.457 358.651 379.148 359.072C379.844 359.494 380.391 360.069 380.789 360.798C381.191 361.523 381.39 362.356 381.385 363.298C381.39 364.241 381.177 365.081 380.746 365.82C380.32 366.558 379.728 367.141 378.97 367.567C378.218 367.988 377.353 368.199 376.378 368.199Z"
            fill={fillColor("JB 4-5")}
          />
        </svg>
      </div>

      {selectedBand && selectedTitle.selectedTitle ? (
        <div className="flex flex-col items-end justify-center w-full mb-32">
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center gap-2 w-full">
              <h1 className="text-lg font-bold" style={{ color: primaryColor }}>
                {selectedBand} | {getBehaviorByBand(selectedBand)?.level}
              </h1>
            </div>
            <ul className="w-full mt-2">
              <li className="flex items-center gap-2">
                <ul className="w-3/4 mt-1 list-disc pl-8">
                  <li className="list-disc text-sm text-gray-800 mb-3">
                    {getBehaviorByBand(selectedBand)?.description}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      ) : null}

      {!selectedTitle.selectedTitle && jbPoints.length > 0 ? (
        <div className="flex flex-col md:items-start items-center justify-center w-full mb-32">
          <div className="w-9/12">
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: primaryColor }}
            >
              {jbPoints[0].jobBand} | {jbPoints[0].level}
            </h2>
            <ul className="list-disc pl-8 space-y-3">
              {jbPoints.map((point, index) => (
                <li key={index} className="text-sm text-gray-800">
                  {point.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {selectedTitle.selectedTitle && !selectedBand ? (
        <div className="flex flex-col md:items-start items-center justify-center w-full mb-32">
          <div className="w-9/12">
            {behaviors?.map((desc) => (
              <div
                className="flex items-center mb-3 space-x-10"
                key={desc.description}
              >
                <div className="flex-shrink-0 w-16">
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: secondaryColor,
                      borderColor: primaryColor,
                      color: primaryColor,
                      whiteSpace: "nowrap",
                      minWidth: "85px",
                      display: "inline-block",
                    }}
                    className="text-xs px-2 text-center"
                  >
                    {desc.jobBand}
                  </Badge>
                </div>
                <span className="text-sm text-gray-800 ml-4 flex-grow w-full">
                  {desc.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SVGComponent;
