!(function(a) {
    var e,
        l =
            '<svg><symbol id="icon-message1" viewBox="0 0 1025 1024"><path d="M192.712348 956.371478c-5.186783 0-10.373565-1.380174-14.981565-4.096-8.303304-4.919652-13.690435-13.55687-14.402783-23.173565l-11.820522-157.295304c-96.456348-76.911304-151.507478-182.850783-151.507478-292.530087C-0.022261 252.282435 229.732174 67.628522 512.133565 67.628522c282.37913 0 512.133565 184.653913 512.133565 411.648S794.534957 890.924522 512.133565 890.924522c-46.636522 0-92.783304-5.008696-137.327304-14.937043l-169.828174 77.712696C201.082435 955.481043 196.87513 956.371478 192.712348 956.371478zM512.133565 126.597565c-249.878261 0-453.186783 158.208-453.186783 352.678957 0 96.345043 49.263304 186.434783 138.685217 253.662609 6.789565 5.12 11.041391 12.889043 11.686957 21.370435l9.638957 128.155826 140.466087-64.26713c5.965913-2.782609 12.710957-3.428174 19.166609-1.869913 43.141565 10.373565 88.064 15.62713 133.587478 15.62713 249.878261 0 453.164522-158.208 453.164522-352.678957C965.320348 284.805565 762.011826 126.597565 512.133565 126.597565z"  ></path></symbol><symbol id="icon-valentine_-message-love-bubble-talk" viewBox="0 0 1024 1024"><path d="M32 480C32 267.936 246.912 96 512 96c265.088 0 480 171.936 480 384s-214.912 384-480 384c-42.816 0-84.352-4.48-123.84-12.896l-204.16 134.592 11.52-216.96C95.328 698.336 32 595.104 32 480z m638.4-99.872a96.128 96.128 0 0 1 0 135.776L512 674.304l-158.4-158.4a96.064 96.064 0 0 1 0-135.776 96.128 96.128 0 0 1 135.776 0l22.624 22.624 22.624-22.624a96.064 96.064 0 0 1 135.776 0z"  ></path></symbol><symbol id="icon-wode_huaban" viewBox="0 0 1024 1024"><path d="M642.43 510.74C698.98 470.04 736 403.83 736 329c0-123.52-100.48-224-224-224S288 205.48 288 329c0 74.84 37.02 141.04 93.57 181.74-153.66 51.62-269.89 191.02-283.84 359.62-1.45 17.61 11.64 33.08 29.25 34.53 17.83 1.44 33.08-11.64 34.53-29.25C176.48 694.72 330.42 553 512 553s335.53 141.72 350.5 322.64c1.38 16.72 15.38 29.36 31.86 29.36 0.88 0 1.77-0.03 2.67-0.11 17.61-1.45 30.7-16.92 29.25-34.53-13.94-168.6-130.17-308.01-283.85-359.62zM352 329c0-88.22 71.78-160 160-160s160 71.78 160 160-71.78 160-160 160-160-71.78-160-160z"  ></path></symbol></svg>',
        t = (e = document.getElementsByTagName('script'))[e.length - 1].getAttribute('data-injectcss');
    if (t && !a.__iconfont__svg__cssinject__) {
        a.__iconfont__svg__cssinject__ = !0;
        try {
            document.write(
                '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
            );
        } catch (e) {
            console && console.log(e);
        }
    }
    !(function(e) {
        if (document.addEventListener)
            if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) setTimeout(e, 0);
            else {
                var t = function() {
                    document.removeEventListener('DOMContentLoaded', t, !1), e();
                };
                document.addEventListener('DOMContentLoaded', t, !1);
            }
        else
            document.attachEvent &&
                ((o = e),
                (i = a.document),
                (c = !1),
                (l = function() {
                    try {
                        i.documentElement.doScroll('left');
                    } catch (e) {
                        return void setTimeout(l, 50);
                    }
                    n();
                })(),
                (i.onreadystatechange = function() {
                    'complete' == i.readyState && ((i.onreadystatechange = null), n());
                }));
        function n() {
            c || ((c = !0), o());
        }
        var o, i, c, l;
    })(function() {
        var e, t, n, o, i, c;
        ((e = document.createElement('div')).innerHTML = l),
            (l = null),
            (t = e.getElementsByTagName('svg')[0]) &&
                (t.setAttribute('aria-hidden', 'true'),
                (t.style.position = 'absolute'),
                (t.style.width = 0),
                (t.style.height = 0),
                (t.style.overflow = 'hidden'),
                (n = t),
                (o = document.body).firstChild
                    ? ((i = n), (c = o.firstChild).parentNode.insertBefore(i, c))
                    : o.appendChild(n));
    });
})(window);
